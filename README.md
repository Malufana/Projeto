# Projeto Sistema de Ordem de Serviço

## Sobre o Projeto
É um sistema de Ordem de Serviçoda TechEdu, utilizando tecnologias Django no back-end e React no front-end. O sistema deve incluir as funcionalidades de Cadastro e Autenticação de Usuários, com login e logout, Ordem de Serviço, Patrimônios, Ambientes, Manutentores e Gestores.

## Criando o Back-End Projeto
Começamos criando a env e entrando no ambiente virtual, instalando as dependências e a pasta do projeto

python -m venv env\
env\Scripts\activate\
pip install django\
django-admin startproject ordem\
python manage.py start api\
\
Dentro do settings.py (esta na pasta de ordem)
adicionar no INSTALLED_APPS\
'corsheaders'\
'rest_framework'\
'rest_framework_simplejwt'\
'api' //pasta que vai ficar o models\
\
## models.py
Dentro da pasta api - entrar em models.py\
from django.db import models\

class Gestores(models.Model)://Tabela Gestores\
    sn = models.CharField(max_length=10, unique=True)\
    nome = models.CharField(max_length=100)\
    cargo = models.CharField(max_length=100)

class Area(models.Model)://Tabela Area\
    area = models.CharField(max_length=100)

class Manutentores(models.Model)://Tabela Manutentores\
    sn = models.CharField(max_length=10, unique=True)\
    nome = models.CharField(max_length=100)\
    email = models.EmailField(max_length=70, unique=True)\
    area = models.ForeignKey(Area, on_delete=models.CASCADE)\
    gestor = models.ForeignKey(Gestores, on_delete=models.CASCADE)

class Ambientes(models.Model)://Tabela de Ambientes\
    sig = models.IntegerField(unique=True)\
    descricao = models.CharField(max_length=100)\
    sn = models.CharField(max_length=10, unique=True)\
    responsavel = models.CharField(max_length=100)

class Patrimonios(models.Model)://Tabela Patrimonios\
    ni = models.CharField(max_length=10, unique=True)\
    descricao = models.CharField(max_length=255)\
    localizacao = models.CharField(max_length=255)

class statusChoices(models.IntegerChoices)://Escolhas de Status da Tabela de OrdemServico\
    iniciada = 1, 'Iniciada'\
    pendente = 2, 'Pendente'\
    finalizada = 3, 'Finalizada'\
    cancelada = 4, 'Cancelada'

class prioridadesChoices(models.IntegerChoices)://Escolhas de Prioridade da Tabela de OrdemServico\
    alta = 1, 'Alta'\
    media = 2, 'Media'\
    baixa = 3, 'Baixa'

class OrdemServico(models.Model)://Tabela OrdemServico\
    descricao = models.CharField(max_length=255)\
    abertura = models.DateTimeField()\
    fechamento = models.DateTimeField()\
    status = models.IntegerChoices(choices=statusChoices.choices, default=statusChoices.pendente)\
    patrimonio = models.ForeignKey(Patrimonios, on_delete=models.CASCADE)\
    ambiente = models.ForeignKey(Ambientes, on_delete=models.CASCADE)\
    manutentor = models.ForeignKey(Manutentores, on_delete=models.CASCADE)\
    prioridade = models.IntegerChoices(choices=prioridadesChoices.choices, default=prioridadesChoices.baixa)\
    funcionario = models.CharField(max_length=100)\
    snFuncionario = models.CharField(max_length=100)\

## forms.py
Criar um arquivo .py dentro da pasta api\

from django import forms

class ExcelUploadForm(forms.Form):\
    ambientes = forms.FileField(required=False, label='Arquivo de Ambientes')\
    patrimonios = forms.FileField(required=False, label='Arquivo de Patrimonios')\
    gestores = forms.FileField(required=False, label='Arquivo de Gestores')\
    manutentores = forms.FileField(required=False, label='Arquivo de Manutentores')\
    areas = forms.FileField(required=False, label='Arquivo de Areas')\
    
## views.py

from django.shortcuts import render\
import pandas as pd\
from api.models import *\
from .forms import ExcelUploadForm\
from django.views import View\

class ProcessUploadView(View):\
    def get(self, request):\
        form = ExcelUploadForm()\
        return render(request, 'upload.html', {'form': form})\
        
    def processUpload(request):\
        if request.method == 'POST':\
            form = ExcelUploadForm(request.POST, request.FILES)\
    
            if form.is_valid():\
                arquivos = {\
                    'ambientes': (request.FILES.get('ambientes'), Ambientes),\
                    'patrimonios': (request.FILES.get('patrimonios'), Patrimonios),\
                    'gestores': (request.FILES.get('gestores'), Gestores),\
                    'manutentores': (request.FILES.get('manutentores'), Manutentores),\
                    'area': (request.FILES.get('area'), Area)\
                }
    
                for nomeCampo, (arquivo, modelo) in arquivos.items():\
                    if arquivo:\
                        try:\
                            df = pd.read_excel(arquivo)
    
                            for _, row in df.iterrows():\
                                modelo.objects.create(**row.to_dict())\
                            
                        except Exception as e:\
                            print(f"Erro ao processar {nomeCampo}: {e}")\
                return render(request, 'upload.html', {'form': form, 'sucess': True})\
        return render(request, 'upload.html', {'form': form})\

## urls.py
