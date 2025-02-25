from django.urls import path, include
from .views import product_details
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'appagri'

router = DefaultRouter()
router.register(r'ats-intro', views.ATSIntroViewSet, basename='atsintro')
router.register(r'ats-info',views.ATSInfoViewSet, basename="atsinfo")
router.register(r'ats-contact-info',views.ATSContactInfoViewSet, basename="atscontactinfo")
router.register(r'ats-contact-product-info',views.ATSContactProductInfoViewSet, basename="atscontactproductinfo")
router.register(r'ats-contact-product-images',views.ATSContactProductImagesViewSet, basename="atscontactproductimages")
#router.register(r'contact-us-messages',views.ContactsViewSet, basename='contacts-us')
router.register(r'featured-listing',views.FeaturedListingViewSet, basename='featured_listing')

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.home, name='home'),
	path('get-location/',views.get_location, name='get-location'),
    path('compare/<slug:sub_product_slug>/', views.compare, name='compare'),
    path('compare/<slug:sub_product_slug>/product2=<slug:sub_product1_slug>/', views.compare_2_products, name='compare-2-products'),
    path('compare/product1=<slug:sub_product_slug>/product2=<slug:sub_product1_slug>/product3=<slug:sub_product2_slug>/', views.compare_3_products, name='compare-3-products'),
    path('sucessful-review-submission/<str:sub_product_slug>/',views.review_sucess_view, name='sub_product_details-sucess'),
    path('agritech/', views.product, name='product'),
    path('blogs/', views.blogs, name='blogs'),
    path('contactack/',views.thankyou,name='contactack'),
    path('contact/', views.contact, name='contact'),
    path('aboutus/', views.about, name='aboutus'),
	path('global-agritech/', views.intech_view, name="intech"),
    path('global-agritech/<slug:country_name>/<slug:category_type>/', views.global_agritech_country_category, name="global-agritech-country-category"),
    path('global-agritech/<slug:country_name>/<slug:category_type>/<slug:product_slug>/feedback/',views.intech_feedback_view, name="global-tech-feedback"),
    path('agritech-mart-seller-enquiry-success/', views.seller_enquiry_success_view,name="atm-seller-success"),
    path('sucessful-feedback-submission/<str:product_slug>/',views.feedback_sucess_view, name='global-tech-feedback-sucess'),
    path('global-agritech/seller-enquiry-form/',views.seller_enquiry_success_view, name="global-tech-seller-enquiry-success"),
    path('kcenter/', views.kcenter_view, name="kcenter"),
    path('agritech-mart/',views.ats_view, name="ats"),
	path('agritech-mart/<slug:category_slug>/<slug:company_slug>/', views.ats_category_company, name="ats-category-company"),
    path('external-links/', views.BacklinksView, name='external-links'),
    path('<str:sub_product_product>/<str:sub_product_slug>/', views.sub_product_details, name='sub_product_details'),
    path('<str:sub_product_product>/<str:sub_product_slug>/review/',views.review_view, name="review"),
    path('<str:product_slug>/', views.product_details, name='product_details'),
]