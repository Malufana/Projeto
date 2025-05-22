from .models import *
from django.shortcuts import render
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets

class PatrimoniosViewSet(viewsets.ModelViewSet):
    queryset = Patrimonios.objects.all()
    serializer_class = PatrimoniosSerializer
    #permission_classes = [permissions.IsAuthenticated]

class AmbientesViewSet(viewsets.ModelViewSet):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    #permission_classes = [permissions.IsAuthenticated]