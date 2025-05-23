from django.shortcuts import render
import pandas as pd
from api.models import *
from .forms import ExcelUploadForm
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

class ProcessUploadView(View):
    def get(self, request):
        form = ExcelUploadForm()
        return render(request, 'upload.html', {'form': form})

    def post(self, request):
        form = ExcelUploadForm(request.POST, request.FILES)

        if form.is_valid():
            arquivos = {
                'ambientes': (request.FILES.get('ambientes'), Ambientes),
                'patrimonios': (request.FILES.get('patrimonios'), Patrimonios),
                'gestores': (request.FILES.get('gestores'), Gestores),
                'manutentores': (request.FILES.get('manutentores'), Manutentores),
                'area': (request.FILES.get('area'), Area)
            }

            for nomeCampo, (arquivo, modelo) in arquivos.items():
                if arquivo:
                    try:
                        df = pd.read_excel(arquivo)

                        for _, row in df.iterrows():
                            modelo.objects.create(**row.to_dict())
                        
                    except Exception as e:
                        print(f"Erro ao processar {nomeCampo}: {e}")
            return render(request, 'upload.html', {'form': form, 'sucess': True})
        return render(request, 'upload.html', {'form': form})
    

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})