from django.shortcuts import render
from django.views.generic import TemplateView
# from .forms import AccountForm, AddAccountForm

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required


class Login(TemplateView):
    def __init__(self):
        pass

    def get(self, request):
        return render(request, "HTML/login.html")

    def post(self, request):
        input_id = request.POST.get("user-id")
        input_password = request.POST.get("user-id")

        user = authenticate(username=input_id, password=input_password)

        # ユーザ認証
        if user:
            if user.is_active:
                login(request.user)
                return HttpResponseRedirect(reverse("home"))
            
            else:
                return HttpResponse("アカウントが有効ではありません。")

        else:
            return HttpResponse("ログインIDまたはパスワードが間違っています。")

@login_required
def Logout(request):
    logout(request)
    return HttpResponseRedirect(reverse("Login"))

@login_required
def home(request):
    params = {
        "UserID": request.user,
    }
    return render(request, "html/base.html", context=params)