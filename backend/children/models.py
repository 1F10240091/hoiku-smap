from django.contrib.auth.models import User
from django.db import models


class Child(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='children')
    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Allergy(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='allergies')
    ingredient = models.CharField(max_length=100)
    severity = models.CharField(
        max_length=20,
        choices=[
            ('mild', '軽度'),
            ('moderate', '中程度'),
            ('severe', '重篤'),
        ],
        default='moderate'
    )

    def __str__(self):
        return f"{self.child.name} - {self.ingredient}"


class FoodPreference(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='preferences')
    ingredient = models.CharField(max_length=100)
    preference = models.CharField(
        max_length=20,
        choices=[
            ('like', '好き'),
            ('dislike', '嫌い'),
        ]
    )
    handling = models.CharField(
        max_length=20,
        choices=[
            ('exclude', '排除'),
            ('improve', '改善に向けて工夫'),
        ],
        default='exclude'
    )

    def __str__(self):
        return f"{self.child.name} - {self.ingredient}"
