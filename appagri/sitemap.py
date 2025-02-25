from django.contrib.sitemaps import Sitemap
import datetime
from .models import Product, SubProduct, IntechProduct, ATSContactInfo, kcentertopic
from django.urls import reverse
from django.utils.text import slugify

class HomePageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0

    def items(self):
        return ['home']  

    def location(self, item):
        return reverse('appagri:home')
    
    def lastmod(self,obj):
        return datetime.date.today()
    
class AboutUsPageSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 1.0

    def items(self):
        return ['aboutus']

    def location(self, item):
        return reverse('appagri:aboutus')
    
    def lastmod(self,obj):
        return datetime.date.today()
    

class ContactUsPageSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.7
    

    def items(self):
        return ['contact']

    def location(self, item):
        return reverse('appagri:contact') 
    
    def lastmod(self,obj):
        return datetime.date.today()

class BlogsPageSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 1.0
    

    def items(self):
        return ['blogs']

    def location(self, item):
        return reverse('appagri:blogs')
    
    def lastmod(self,obj):
        return datetime.date.today()

class ProductPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return ['product']

    def location(self, item):
        return reverse('appagri:product') 
    
    def lastmod(self,obj):
        return datetime.date.today()

class ComparePageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return SubProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:compare', args=[obj.slug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class Compare2ProductsPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return SubProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:compare-2-products', kwargs={'sub_product_slug':obj.slug,'sub_product1_slug':obj.slug}) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class Compare3ProductsPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return SubProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:compare-3-products', kwargs={'sub_product_slug':obj.slug,'sub_product1_slug':obj.slug,'sub_product2_slug':obj.slug}) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class ProductDetailsPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return Product.objects.all()

    def location(self, obj):
        return reverse('appagri:product_details', args=[obj.slug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class SubProductDetailsPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    
    def items(self):
        return SubProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:sub_product_details', args=[slugify(obj.product),obj.slug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()
 
class SubProductReviewPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    
    def items(self):
        return SubProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:review', args=[slugify(obj.product),obj.slug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class KCenterSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 1.0
    

    def items(self):
        return ['kcenter']

    def location(self, item):
        return reverse('appagri:kcenter') 
    
    def lastmod(self,obj):
        return datetime.date.today()

class KCenterCategorySitemap(Sitemap):
    changefreq = 'monthly'
    priority = 1.0
    

    def items(self):
        return kcentercategories.objects.all()

    def location(self, obj):
        return reverse('appagri:kcenter-category', args=[obj.categoriesslug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class KCenterCategoryTopicSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 1.0
    

    def items(self):
        return kcentertopic.objects.all()

    def location(self, obj):
        return reverse('appagri:kcenter-topic', args=[obj.category.categoriesslug, obj.ktopic_slug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class GlobalAgritechPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return ['global-agritech']

    def location(self, item):
        return reverse('appagri:intech') 
    
    def lastmod(self,obj):
        return datetime.date.today()
    
class GlobalAgritechCountryCategoryPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return IntechProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:global-agritech-country-category', args=[obj.category.country.country_slug, slugify(obj.product_class)]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class GlobalAgritechFeedbackPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    
    def items(self):
        return IntechProduct.objects.all()

    def location(self, obj):
        return reverse('appagri:global-tech-feedback', args=[obj.category.country.country_slug, slugify(obj.product_class), obj.product_slug]) 
    
    def lastmod(self,obj):
        return datetime.date.today()

class AgritechMartPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return ['agritech-mart']

    def location(self, item):
        return reverse('appagri:ats') 
    
    def lastmod(self,obj):
        return datetime.date.today()

class AgritechMartCategoryCountryPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0
    

    def items(self):
        return ATSContactInfo.objects.all()

    def location(self, obj):
        return reverse('appagri:ats-category-company', args=[obj.category.category_slug, slugify(obj.contact_company_name)]) 
    
    def lastmod(self,obj):
        return datetime.date.today()