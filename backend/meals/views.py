import base64
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ingredient, Recipe, NurseryMenu, HomeMenu
from .serializers import IngredientSerializer, RecipeSerializer, NurseryMenuSerializer, HomeMenuSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class NurseryMenuViewSet(viewsets.ModelViewSet):
    serializer_class = NurseryMenuSerializer

    def get_queryset(self):
        return NurseryMenu.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HomeMenuViewSet(viewsets.ModelViewSet):
    serializer_class = HomeMenuSerializer

    def get_queryset(self):
        return HomeMenu.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ScanNurseryMenuView(APIView):
    def post(self, request):
        image_base64 = request.data.get('image_base64')
        if not image_base64:
            return Response({'error': '画像データが必要です'}, status=status.HTTP_400_BAD_REQUEST)

        # TODO: OpenAI Vision APIでOCR実装
        return Response({'message': 'OCR機能は未実装です'})


class GenerateHomeMenuView(APIView):
    def post(self, request):
        child_id = request.data.get('child_id')
        date = request.data.get('date')
        nursery_meals = request.data.get('nursery_meals')
        ingredients = request.data.get('ingredients', [])

        # TODO: OpenAI APIで献立生成実装
        return Response({'message': 'AI献立生成機能は未実装です'})
