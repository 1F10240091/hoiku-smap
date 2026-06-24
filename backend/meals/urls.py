from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'ingredients', views.IngredientViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'nursery-menus', views.NurseryMenuViewSet, basename='nurserymenu')
router.register(r'home-menus', views.HomeMenuViewSet, basename='homemenu')

urlpatterns = [
    path('', include(router.urls)),
    path('scan/', views.ScanNurseryMenuView.as_view(), name='scan-nursery-menu'),
    path('generate/', views.GenerateHomeMenuView.as_view(), name='generate-home-menu'),
]
