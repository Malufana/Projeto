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
