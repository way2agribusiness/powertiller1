from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.sitemaps import views
from appagri.sitemap import (
    HomePageSitemap, AboutUsPageSitemap, ContactUsPageSitemap, BlogsPageSitemap, 
    ProductPageSitemap, ComparePageSitemap, ProductDetailsPageSitemap, 
    SubProductDetailsPageSitemap, KCenterSitemap, SubProductReviewPageSitemap, 
    GlobalAgritechPageSitemap, GlobalAgritechFeedbackPageSitemap, 
    AgritechMartPageSitemap, Compare2ProductsPageSitemap, Compare3ProductsPageSitemap, 
    GlobalAgritechCountryCategoryPageSitemap, KCenterCategorySitemap, 
    KCenterCategoryTopicSitemap, AgritechMartCategoryCountryPageSitemap
)
import os
from django.http import HttpResponse
from django.views import View

# Sitemap definitions
sitemaps = {
    'home': HomePageSitemap,
    'aboutus': AboutUsPageSitemap,
    'contact': ContactUsPageSitemap,
    'blogs': BlogsPageSitemap,
    'kcenter': KCenterSitemap,
    'kcenter-category': KCenterCategorySitemap,
    'kcenter-category-topic': KCenterCategoryTopicSitemap,
    'products': ProductPageSitemap,
    'compare': ComparePageSitemap,
    'compare2': Compare2ProductsPageSitemap,
    'compare3': Compare3ProductsPageSitemap,
    'global-agritech': GlobalAgritechPageSitemap,
    'global-agritech-country-category': GlobalAgritechCountryCategoryPageSitemap,
    'global-agritech-feedback': GlobalAgritechFeedbackPageSitemap,
    'agritech-mart': AgritechMartPageSitemap,
    'agritech-mart-category-country': AgritechMartCategoryCountryPageSitemap,
    'productdetails': ProductDetailsPageSitemap,
    'subproductdetails': SubProductDetailsPageSitemap,
    'subproduct-review': SubProductReviewPageSitemap,
}

# Robots.txt view
class RobotsTxtView(View):
    def get(self, request):
        file_path = os.path.join(settings.BASE_DIR, 'robots.txt')
        try:
            with open(file_path, 'r') as file:
                content = file.read()
        except FileNotFoundError:
            content = ""
        return HttpResponse(content, content_type='text/plain')

# URL patterns
urlpatterns = [
    # Admin panel
    path('admin/master-console-y746x/', admin.site.urls),  # Custom admin URL
    path('admin/', admin.site.urls),

    # Include app URLs (make sure to only include this once)
    path('', include('appagri.urls')),

    # Authentication URLs (if you're using allauth)
    re_path(r'^', include('allauth.urls')),

    # Sitemap and robots.txt
    path('sitemap.xml', views.sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('robots.txt', RobotsTxtView.as_view(), name='robots.txt'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
