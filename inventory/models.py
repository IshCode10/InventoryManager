from django.db import models

class InventoryItem(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    unit = models.CharField(max_length=20)  # e.g. "lbs", "each", "gallons"
    current_qty = models.DecimalField(max_digits=8, decimal_places=2)
    cost_per_unit = models.DecimalField(max_digits=8, decimal_places=2)
    low_stock_threshold = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name

class WasteLog(models.Model):
    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name='waste_logs')
    quantity = models.DecimalField(max_digits=8, decimal_places=2)
    reason = models.CharField(max_length=200)
    raw_text = models.TextField(blank=True)  # the original natural-language input, for later
    logged_by = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def cost_estimate(self):
        return self.quantity * self.item.cost_per_unit

    def __str__(self):
        return f"{self.quantity} {self.item.unit} of {self.item.name} wasted"


class Restock(models.Model):
    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name='restocks')
    quantity_received = models.DecimalField(max_digits=8, decimal_places=2)
    logged_by = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity_received} {self.item.unit} of {self.item.name} received"
