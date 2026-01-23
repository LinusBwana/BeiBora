from .models import Category, Product
from rest_framework import serializers
from decimal import Decimal


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at', 'modified_at']
        read_only_fields = ['id', 'created_at', 'modified_at']


class ProductSerializer(serializers.ModelSerializer):
    # Override price and quantity in models with custom messages
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'),
                                     error_messages = {'min_value': 'Price must be atleast Ksh 0.01'})
    quantity = serializers.IntegerField(min_value=1, error_messages = {'min_value': 'Quantity must be at least 1'})

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity', 'category','created_at', 'modified_at']
        read_only_fields = ['id', 'created_at', 'modified_at']

    # The below is not necessary:
    """
    def validate_price(self, value):
        if value < Decimal('0.01'):
            raise serializers.ValidationError("Price must be atleast Ksh 0.01")
        return value
    
    def validate(self, attrs): 
        #attrs is a dictionary of validated data that the user submitted through the API, not the model instance.
        if attrs.get('quantity', 0) < 1: # Returns 0 if 'quantity' not present
            raise serializers.ValidationError("Quantity must be at least 1")
        return attrs
    """