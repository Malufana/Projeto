from django.db import models

class Gestores(models.Model):
    sn = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)

class Area(models.Model):
    area = models.CharField(max_length=100)

class Manutentores(models.Model):
    sn = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=70, unique=True)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    gestor = models.ForeignKey(Gestores, on_delete=models.CASCADE)

class Ambientes(models.Model):
    sig = models.IntegerField(unique=True)
    descricao = models.CharField(max_length=100)
    sn = models.CharField(max_length=10, null=True, blank=True)
    responsavel = models.CharField(max_length=100)

class Patrimonios(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    descricao = models.CharField(max_length=255)
    localizacao = models.CharField(max_length=255)

class OrdemServico(models.Model):
    status_choice=[
        (1, 'Iniciada'),
        (2, 'Pendente'),
        (3, 'Finalizada'),
        (4, 'Cancelada')
    ]

    prioridades_choices=[
        (1, 'Alta'),
        (2, 'Media'),
        (3, 'Baixa')
    ]

    descricao = models.CharField(max_length=255)
    abertura = models.DateTimeField()
    fechamento = models.DateTimeField()
    status = models.IntegerField(choices=status_choice)
    patrimonio = models.ForeignKey(Patrimonios, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambientes, on_delete=models.CASCADE)
    manutentor = models.ForeignKey(Manutentores, on_delete=models.CASCADE)
    prioridade = models.IntegerField(choices=prioridades_choices)
    funcionario = models.CharField(max_length=100)
    snFuncionario = models.CharField(max_length=100)