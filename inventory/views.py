from rest_framework import viewsets
from .models import InventoryItem, WasteLog, Restock
from .serializers import InventoryItemSerializer, WasteLogSerializer, RestockSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .ai_parser import parse_waste_text
from .matching import find_best_match
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ParseWasteTextView(APIView):
    def post(self, request):
        text = request.data.get('text', '').strip()
        if not text:
            return Response({'error': 'No text provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            parsed = parse_waste_text(text)
        except Exception as e:
            return Response({'error': f'Could not parse: {str(e)}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        item_name = parsed.get('item_name', '')
        matched_item, score = find_best_match(item_name)

        CONFIDENCE_THRESHOLD = 70

        result = {'parsed': parsed, 'raw_text': text, 'confidence': score}
        if matched_item and score >= CONFIDENCE_THRESHOLD:
            result['matched_item_id'] = matched_item.id
            result['matched_item_name'] = matched_item.name
        else:
            result['matched_item_id'] = None

        return Response(result)

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

class WasteLogViewSet(viewsets.ModelViewSet):
    queryset = WasteLog.objects.all().order_by('-created_at')
    serializer_class = WasteLogSerializer

class RestockViewSet(viewsets.ModelViewSet):
    queryset = Restock.objects.all().order_by('-created_at')
    serializer_class = RestockSerializer