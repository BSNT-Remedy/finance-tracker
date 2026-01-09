from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('expenses/', views.ExpenseListCreate.as_view(), name='home'),
    path('delete/<int:pk>/', views.ExpenseDelete.as_view(), name='delete'),
    path('edit/<int:pk>/', views.ExpenseEdit.as_view(), name='edit'),
]
