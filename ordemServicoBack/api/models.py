from django.db import models

class Gestores(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)

class Manutentores(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    gestor = models.ForeignKey(Gestores, on_delete=models.CASCADE)

class Ambientes(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=255)

class Patrimonios(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    descricao = models.CharField(max_length=255)
    localizacao = models.CharField(max_length=255)