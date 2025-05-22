from django.db import models

class Area(models.Model):
    area = models.CharField(max_length=100)

class Funcionarios(models.Model):
    sn = models.IntegerField(unique=True)
    nome = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)

class Ambientes(models.Model):
    sig = models.IntegerField(unique=True)
    descricao = models.CharField(max_length=100)
    responsavel = models.ForeignKey(Funcionarios, on_delete=models.CASCADE)

class Patrimonios(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    descricao = models.CharField(max_length=255)
    localizacao = models.ForeignKey(Ambientes, on_delete=models.CASCADE)

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
    prioridade = models.IntegerField(choices=prioridades_choices)
    requisitante = models.ForeignKey(Funcionarios, on_delete=models.CASCADE, related_name='ordens_executadas', null=True, blank=True)
    manutentor = models.ForeignKey(Funcionarios, on_delete=models.CASCADE, related_name='ordens_manutentidas', null=True, blank=True)
    executor = models.ForeignKey(Funcionarios, on_delete=models.CASCADE, related_name='ordens_requisitadas', null=True, blank=True)
