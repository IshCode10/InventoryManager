from rapidfuzz import process, fuzz
from .models import InventoryItem

def find_best_match(item_name):
    items = InventoryItem.objects.all()
    names = {item.name: item for item in items}
    if not names:
        return None, 0
    best_name, score, _ = process.extractOne(item_name, names.keys(), scorer=fuzz.WRatio)
    return names[best_name], score