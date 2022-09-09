from django.contrib import admin
from django.urls import path, include
from .views import list_hats, show_hat



urlpatterns = [
    path("hats/", list_hats, name="list_hats"),
    path("hats/<int:pk>/", show_hat, name="show_hat"),
]

