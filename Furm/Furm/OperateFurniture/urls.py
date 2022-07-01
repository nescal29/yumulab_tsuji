from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("move_toio/", views.move_toio, name="move-toio"),
]