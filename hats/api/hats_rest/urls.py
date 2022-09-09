from django.contrib import admin
from django.urls import path, include
from .views import list_hats



urlpatterns = [
    path("hats/", list_hats, name="list_hats"),
]

