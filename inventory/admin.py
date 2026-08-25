from django.contrib import admin
from .models import InventoryItem, WasteLog, Restock

admin.site.register(InventoryItem)
admin.site.register(WasteLog)
admin.site.register(Restock)