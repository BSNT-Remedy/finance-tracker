from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import ExpenseSerializer, UserSerializer
from datetime import datetime
import json

from .models import Category, Expense

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # expenses = Expense.objects.all()
        user = self.request.user
        return Expense.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class ExpenseEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(author=user)

# @csrf_exempt
# def editExpense(request, pk):
#     if request.method == "POST":
#         expense = get_object_or_404(Expense, pk=pk)

#         data = json.loads(request.body)

#         name = data.get('name')
#         category_id = data.get('category')
#         amount = data.get('amount')
#         spent_at = data.get('spent_at')

#         try:
#             date_spent = datetime.fromisoformat(spent_at)
#         except:
#             return JsonResponse({"error": "Invalid date"}, status=400)
        
#         try:
#             category_obj = Category.objects.get(id=category_id)
#         except Category.DoesNotExist:
#             return JsonResponse({"error": "Invalid category"}, status=400)
        
#         expense.name = name
#         expense.category = category_obj
#         expense.amount = amount
#         expense.spent_at = date_spent
        
#         expense.save(update_fields=['name', 'category', 'amount', 'spent_at'])

#         return JsonResponse({"message": "Expense Updated"}, status=201)
#     return JsonResponse({"error": "Invalid"}, status=401)

class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(author = user)