from django.db import models
import uuid
from django.core.validators import MinValueValidator
from decimal import Decimal


# Create your models here.
class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    GENDER_CHOICES = [
        ('', 'No Gender'),
        ('male', 'Male'),
        ('female', 'Female'),
        ('unisex', 'Unisex'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/', blank=True, 
                              default='products/default.jpg')
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    stock = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    category =  models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', '-created_at']),
            models.Index(fields=['category','gender']),                   
            models.Index(fields=['gender']),                   
            models.Index(fields=['description']),                   
        ]

    def __str__(self):
        return self.name