from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('', views.ExpenseList.as_view(), name='home'),
    path('new/', views.newExpense, name='new'),
]
