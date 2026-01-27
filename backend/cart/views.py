from django.shortcuts import render
from rest_framework import viewsets
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

# Create your views here.
class CartViewset(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartItemViewset(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
