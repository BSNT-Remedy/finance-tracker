from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Expense(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='expenses')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    spent_at = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expenses")

    class Meta:
        ordering = ['-spent_at']

    def __str__(self):
        return f"{self.name} - ₱{self.amount}"