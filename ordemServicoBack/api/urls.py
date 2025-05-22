from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .viewsets import *
from rest_framework.routers import DefaultRouter
# urls.py
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'detail': 'CSRF cookie set'})


router = DefaultRouter()
router.register(r'patrimonios', PatrimoniosViewSet, basename="patrimonios")
router.register(r'ambientes', AmbientesViewSet, basename="ambientes")

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload/', views.ProcessUploadView.as_view(), name='upload'),
    path('', include(router.urls)),
    path('api/get-csrf/', get_csrf_token),
]
