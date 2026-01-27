from django.db import models
from products.models import Product
from django.core.validators import MinValueValidator
from uuid import uuid4
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=255, null=True, blank=True)  # For anonymous users
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        return sum(item.subtotal for item in self.items.all())
    

class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    
    @property
    def subtotal(self):
        return self.product.price * self.quantity

    class Meta:
        unique_together = ['cart', 'product']