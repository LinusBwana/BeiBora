from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'products' 

router = DefaultRouter()
router.register('products', views.ProductViewset, basename='products')
router.register('category', views.CategoryViewset, basename='category')

urlpatterns = [
    path('', include(router.urls))
]