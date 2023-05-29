from django.contrib import admin
from django.urls import path
from django.urls import path, include, re_path
from appagri import urls as appagri_urls
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('appagri.urls')),
    path('', include(appagri_urls, namespace="projagri")),
    re_path("", include("allauth.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
