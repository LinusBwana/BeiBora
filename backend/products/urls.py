from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'products' 

router = DefaultRouter()
router.register(r'categories', views.CategoryViewset, basename='category')
router.register(r'', views.ProductViewset, basename='products')


urlpatterns = [
    path('', include(router.urls))
]