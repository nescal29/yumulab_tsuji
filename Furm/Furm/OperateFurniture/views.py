from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "html/index.html")

def move_toio(request):
    return render(request, "html/move_toio.html")
