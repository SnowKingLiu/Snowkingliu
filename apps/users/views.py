# _*_ coding: utf-8 _*_
from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponseRedirect("/index/")



