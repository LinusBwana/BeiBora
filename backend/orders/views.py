from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer

# Create your views here.
class OrderViewset(viewsets.ReadOnlyModelViewSet):
    """
    Users can only view their orders, not create/update/delete
    Orders are created through cart checkout
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)