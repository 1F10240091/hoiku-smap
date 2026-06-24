from rest_framework import serializers
from ..models import Child, Allergy, FoodPreference


class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = ['id', 'ingredient', 'severity']


class FoodPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodPreference
        fields = ['id', 'ingredient', 'preference', 'handling']


class ChildSerializer(serializers.ModelSerializer):
    allergies = AllergySerializer(many=True, read_only=True)
    preferences = FoodPreferenceSerializer(many=True, read_only=True)

    class Meta:
        model = Child
        fields = ['id', 'name', 'birth_date', 'allergies', 'preferences', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
