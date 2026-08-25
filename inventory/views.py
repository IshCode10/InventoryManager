from rest_framework import viewsets
from .models import InventoryItem, WasteLog, Restock
from .serializers import InventoryItemSerializer, WasteLogSerializer, RestockSerializer

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

class WasteLogViewSet(viewsets.ModelViewSet):
    queryset = WasteLog.objects.all().order_by('-created_at')
    serializer_class = WasteLogSerializer

class RestockViewSet(viewsets.ModelViewSet):
    queryset = Restock.objects.all().order_by('-created_at')
    serializer_class = RestockSerializer