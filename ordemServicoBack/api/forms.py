from django import forms

class ExcelUploadForm(forms.Form):
    ambientes = forms.FileField(required=False, label='Arquivo de Ambientes')
    patrimonios = forms.FileField(required=False, label='Arquivo de Patrimonios')
    gestores = forms.FileField(required=False, label='Arquivo de Gestores')
    manutentores = forms.FileField(required=False, label='Arquivo de Manutentores')
    areas = forms.FileField(required=False, label='Arquivo de Areas')