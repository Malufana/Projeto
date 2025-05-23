from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .viewsets import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'patrimonios', PatrimoniosViewSet, basename="patrimonios")
router.register(r'ambientes', AmbientesViewSet, basename="ambientes")

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload/', views.ProcessUploadView.as_view(), name='upload'),
     path('csrf/', views.get_csrf_token, name='csrf'),
    path('', include(router.urls)),
]
