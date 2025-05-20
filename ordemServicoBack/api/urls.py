from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from 

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='tokn_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload/', views.ProcessUploadView.as_view(), name='upload'),
    path('patrimonios/', )
]
