from rest_framework import serializers
from ..models import Ingredient, Recipe, RecipeIngredient, NurseryMenu, HomeMenu


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'calories', 'protein', 'fat', 'carbohydrates', 'fiber']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'amount', 'unit']


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'ingredients', 'instructions', 'calories', 'protein', 'fat', 'carbohydrates', 'created_at']
        read_only_fields = ['id', 'created_at']


class NurseryMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = NurseryMenu
        fields = ['id', 'date', 'raw_text', 'image_data', 'created_at']
        read_only_fields = ['id', 'created_at']


class HomeMenuSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = HomeMenu
        fields = ['id', 'child', 'date', 'nursery_menu', 'recipes', 'shopping_list', 'created_at']
        read_only_fields = ['id', 'created_at']
