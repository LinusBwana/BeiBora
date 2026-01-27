from .models import Category, Product
from rest_framework import viewsets
from .serializers import CategorySerializer, ProductSerializer

# Create your views here.
class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer