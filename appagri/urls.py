from django.urls import path
from .views import product_details
from . import views

app_name = 'appagri'

urlpatterns = [
    path("home/", views.HomgPage.as_view(), name="index"),
    path('', views.home, name='home'),
    path('PowerTiller/<str:product_name>-<int:product_id>/', views.product_details, name='product_details'),
    path('<str:sub_product_name>-<int:sub_product_id>/', views.sub_product_details, name='sub_product_details'),
    path('compare/', views.compare, name='compare'),
    path('products/', views.product, name='product'),
    path('blogs/', views.blogs, name='blogs'),
    path('videos/', views.videos, name='videos'),
    path('contact/', views.contact, name='contact'),
    path('help/', views.problem, name='problem'),
]