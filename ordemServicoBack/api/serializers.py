from rest_framework import serializers
from .models import *

class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        fields = '__all__'

class PatrimoniosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patrimonios
        fields = '__all__'

class ManutentoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manutentores
        fields = '__all__'

class GestoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gestores
        fields = '__all__'

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class OrdemServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdemServico
        fields = '__all__'