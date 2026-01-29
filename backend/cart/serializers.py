from .models import Cart, CartItem
from rest_framework import serializers
from products.serializers import ProductSerializer
from products.models import Product


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'created_at', 'subtotal']
        read_only_fields = ['id', 'created_at']


class AddToCartSerializer(serializers.Serializer):
    """Serializer for adding items to cart with validation"""
    product_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1, default=1)
    
    def validate_product_id(self, value):
        """Check if product exists"""
        try:
            product = Product.objects.get(id=value)
            self._product = product # Store it temporarily
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found")
        return value
    
    def validate(self, data):
        """Validate stock availability"""

        # product = Product.objects.get(id=data['product_id'])
        product = self._product # Reuse instead of querying again
        quantity = data['quantity']
            
        # Check stock
        if product.stock < quantity:
            unit = product.name if product.stock == 1 else f"{product.name}s"
            raise serializers.ValidationError({
                'quantity': f'Insufficient stock. Only {product.stock} {unit} available.'
            })
        
        # Store product in validated_data for later use
        data['product'] = product
                    
        return data


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'session_key','created_at', 'modified_at', 'total_price']
        read_only_fields = ['id', 'created_at', 'modified_at']
