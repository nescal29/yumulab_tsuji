from django.contrib import admin
from django.urls import path, include
from .login import Login

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", Login.as_view(), name="login"),
    path("", include("OperateFurniture.urls")),
]
