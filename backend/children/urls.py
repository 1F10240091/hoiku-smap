from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'children', views.ChildViewSet, basename='child')
router.register(r'allergies', views.AllergyViewSet, basename='allergy')
router.register(r'preferences', views.FoodPreferenceViewSet, basename='foodpreference')

urlpatterns = [
    path('', include(router.urls)),
]
