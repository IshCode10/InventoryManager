from rest_framework import serializers
from .models import InventoryItem, WasteLog, Restock

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'

class WasteLogSerializer(serializers.ModelSerializer):
    cost_estimate = serializers.ReadOnlyField()

    class Meta:
        model = WasteLog
        fields = '__all__'

class RestockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restock
        fields = '__all__'