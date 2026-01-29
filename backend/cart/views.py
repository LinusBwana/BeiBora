from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer, AddToCartSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from orders.models import Order, OrderItem
from orders.serializers import OrderSerializer

# Create your views here.
class CartViewset(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
    def list(self, request):
        """Get or create user's cart"""
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)
        
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        """Add item to cart - with serializer validation"""
        # Use the AddToCartSerializer for validation
        serializer = AddToCartSerializer(data=request.data)
        
        # Validate - this automatically checks stock!
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Get validated data
        validated_data = serializer.validated_data
        product = validated_data['product']  # Already fetched in validation
        quantity = validated_data['quantity']

       # Get or create cart
        cart, _ = Cart.objects.get_or_create(user=request.user)
        
        # Add or update cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Check if adding more would exceed stock
            new_quantity = cart_item.quantity + quantity
            if product.stock < new_quantity:
                return Response(
                    {'error': f'Cannot add {quantity} more. Only {product.stock - cart_item.quantity} available.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            cart_item.quantity = new_quantity
            cart_item.save()
        
        # Return updated cart
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data, status=status.HTTP_201_CREATED) 


    @action(detail=False, methods=['post'])
    @transaction.atomic
    def checkout(self, request):
        """Checkout - Create order from cart"""
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {'error': 'Cart not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Validate cart is not empty
        if not cart.items.exists():
            return Response(
                {'error': 'Cart is empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate stock for all items
        for item in cart.items.all():
            if item.product.stock < item.quantity:
                return Response(
                        {'error': f'Insufficient stock for {item.product.name}'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
        # Get shipping info from request
        shipping_address = request.data.get('shipping_address')
        shipping_city = request.data.get('shipping_city')
        shipping_country = request.data.get('shipping_country')
        
        # Validate shipping info
        if not all([shipping_address, shipping_city, shipping_country]):
            return Response(
                {'error': 'Please provide complete shipping information'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        #  Calculate total from cart
        total = cart.total_price

        # Create order
        order = Order.objects.create(
            user=request.user,
            total_price=total,
            shipping_address=shipping_address,
            shipping_city=shipping_city,
            shipping_country=shipping_country,
        )

        # Copy cart items to order items and update stock
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price  # Store price at purchase time
            )

            # Deduct stock
            cart_item.product.stock -= cart_item.quantity
            cart_item.product.save()

        # Clear cart
        cart.items.all().delete()
        
        # Return order details
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['delete'])
    def clear(self, request):
        """Clear all items from cart"""
        try:
            cart = Cart.objects.get(user=request.user)
            cart.items.all().delete()
            return Response({'message': 'Cart cleared'}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response(
                {'error': 'Cart not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class CartItemViewset(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        """Update cart item quantity"""
        cart_item = self.get_object()
        quantity = request.data.get('quantity')
        
        if quantity:
            quantity = int(quantity)
            if quantity <= 0:
                cart_item.delete()
                return Response(
                    {'message': 'Item removed from cart'},
                    status=status.HTTP_200_OK
                )
            
            # Check stock
            if cart_item.product.stock < quantity:
                return Response(
                    {'error': 'Insufficient stock'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            cart_item.quantity = quantity
            cart_item.save()
        
        serializer = self.get_serializer(cart_item)
        return Response(serializer.data)