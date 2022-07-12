from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("settings/", views.settings, name="settings"),
    path("move_toio/", views.move_toio, name="move_toio"),
]