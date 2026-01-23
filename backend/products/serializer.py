from .models import Category, Product
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at', 'modified_at']
        read_only_fields = ['created_at', 'modified_at']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'decription', 'price', 'quantity', 'category','created_at', 'modified_at']
        read_only_fields = ['created_at', 'modified_at']