from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'subtotal']
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'status', 'total_price', 
            'shipping_address', 'shipping_city', 'shipping_country',
            'items', 'created_at', 'modified_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'modified_at']