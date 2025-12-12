from django.shortcuts import render
from rest_framework import generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import ExpenseSerializer
from datetime import datetime
import json

from .models import Category, Expense

class ExpenseList(generics.ListAPIView):
    serializer_class = ExpenseSerializer


    def get_queryset(self):
        expenses = Expense.objects.all()
        return expenses

@csrf_exempt
def newExpense(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        name = data.get('name')
        category_id = data.get('category')
        amount = data.get('amount')
        spent_at = data.get('spent_at')

        try:
            date_spent = datetime.fromisoformat(spent_at)
        except:
            return JsonResponse({"error": "Invalid date"}, status=400)
        
        try:
            category_obj = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return JsonResponse({"error": "Invalid category"}, status=400)
        
        Expense.objects.create(
            name = name,
            category = category_obj,
            amount = amount,
            spent_at = date_spent
        )

        return JsonResponse({"message": "Expense Created"}, status=201)
    return JsonResponse({"error": "Invalid"}, status=401)