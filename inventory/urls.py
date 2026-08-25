from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet, WasteLogViewSet, RestockViewSet

router = DefaultRouter()
router.register('items', InventoryItemViewSet)
router.register('waste-logs', WasteLogViewSet)
router.register('restocks', RestockViewSet)

urlpatterns = router.urls