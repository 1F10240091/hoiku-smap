from rest_framework import viewsets, permissions
from .models import Child, Allergy, FoodPreference
from .serializers import ChildSerializer, AllergySerializer, FoodPreferenceSerializer


class ChildViewSet(viewsets.ModelViewSet):
    serializer_class = ChildSerializer

    def get_queryset(self):
        return Child.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AllergyViewSet(viewsets.ModelViewSet):
    serializer_class = AllergySerializer

    def get_queryset(self):
        return Allergy.objects.filter(child__user=self.request.user)


class FoodPreferenceViewSet(viewsets.ModelViewSet):
    serializer_class = FoodPreferenceSerializer

    def get_queryset(self):
        return FoodPreference.objects.filter(child__user=self.request.user)
