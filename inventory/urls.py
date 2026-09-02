from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet, WasteLogViewSet, RestockViewSet
from django.urls import path
from .views import ParseWasteTextView

router = DefaultRouter()
router.register('items', InventoryItemViewSet)
router.register('waste-logs', WasteLogViewSet)
router.register('restocks', RestockViewSet)

urlpatterns = router.urls + [
    path('parse-waste/', ParseWasteTextView.as_view(), name='parse-waste'),
]
