from django.contrib.auth.models import User
from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    calories = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    carbohydrates = models.FloatField(default=0)
    fiber = models.FloatField(default=0)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')
    instructions = models.TextField(blank=True)
    calories = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    carbohydrates = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    unit = models.CharField(max_length=20, default='g')

    def __str__(self):
        return f"{self.recipe.name} - {self.ingredient.name}"


class NurseryMenu(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nursery_menus')
    date = models.DateField()
    raw_text = models.TextField(blank=True)
    image_data = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"


class HomeMenu(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='home_menus')
    child = models.ForeignKey('children.Child', on_delete=models.CASCADE, related_name='home_menus')
    date = models.DateField()
    nursery_menu = models.ForeignKey(NurseryMenu, on_delete=models.SET_NULL, null=True, blank=True)
    recipes = models.ManyToManyField(Recipe)
    shopping_list = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.child.name} - {self.date}"
