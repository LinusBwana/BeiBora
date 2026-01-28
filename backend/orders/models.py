from django.db import models
from products.models import Product
from uuid import uuid4
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    # Shipping info
    shipping_address = models.TextField()
    shipping_city = models.CharField(max_length=100)
    shipping_country = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.id} - ${self.total_price}"
    

class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Store price at time of purchase

    @property
    def subtotal(self):
        return self.price * self.quantity