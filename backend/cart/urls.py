from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views

app_name = 'cart' 

router = DefaultRouter()
router.register(r'items', views.CartItemViewset, basename='cartitem')
router.register(r'', views.CartViewset, basename='cart')

urlpatterns = [
    path('', include(router.urls))
]