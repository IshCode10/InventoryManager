from rest_framework import serializers
from .models import InventoryItem, WasteLog, Restock
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'

class WasteLogSerializer(serializers.ModelSerializer):
    cost_estimate = serializers.ReadOnlyField()

    class Meta:
        model = WasteLog
        fields = '__all__'

    def create(self, validated_data):
        waste_log = super().create(validated_data)
        item = waste_log.item
        item.current_qty = item.current_qty - waste_log.quantity
        item.save()
        return waste_log

class RestockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restock
        fields = '__all__'

    def create(self, validated_data):
        restock = super().create(validated_data)
        item = restock.item
        item.current_qty = item.current_qty + restock.quantity_received
        item.save()
        return restock