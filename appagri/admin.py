from django.contrib import admin
from .models import Product,ContactNumber,Numberofvisits,SubProduct,Banner, Highlights, Home_Information, Blogs, Logo, Review, ReviewResponse, ATSInfo, ATSContactInfo,ATSContactProductInfo,ATSContactProductImages,ATSIntro,ATSSeller, ATSSellerProductImage, FeaturedListing
from .models import KCenter,Brands, SeoPageExtLinks,Subproduct_External_links,Credentials,Comments,Contacts, IntechIntro, IntechCountry, IntechCategoryDetails,IntechProduct, IntechFeedback, IntechSeller, IntechSellerProductImage, IntechRoadmap, GlobalAgritechProductAvgRating,kcentertopic
from django.db import models
from django.forms import TextInput

class NumberofvisitsAdmin(admin.ModelAdmin):
    list_display = ['city', 'district', 'region', 'Time']
    list_filter = ['city', 'district']  # Add city filter

    # Custom method to calculate total visits per district
    def total_visits_by_district(self, obj):
        return Numberofvisits.objects.filter(district=obj.district).count()
    total_visits_by_district.short_description = 'Total Visits by District'

    # Custom method to calculate unknown visits per district
    def unknown_visits_by_district(self, obj):
        return Numberofvisits.objects.filter(district=obj.district, city__isnull=True).count()
    unknown_visits_by_district.short_description = 'Unknown Visits by District'

    # Custom method to calculate total visits per city
    def total_visits_by_city(self, obj):
        return Numberofvisits.objects.filter(city=obj.city).count()
    total_visits_by_city.short_description = 'Total Visits by City'

    # Custom method to calculate unknown visits per city
    def unknown_visits_by_city(self, obj):
        return Numberofvisits.objects.filter(city=obj.city, district__isnull=True).count()
    unknown_visits_by_city.short_description = 'Unknown Visits by City'

    # Customize the admin change list to include total visits and unknown visits for city or district
    def changelist_view(self, request, extra_context=None):
        city = request.GET.get('city')
        district = request.GET.get('district')
        if city:
            visits = Numberofvisits.objects.filter(city=city)
            total_visits = visits.count()
            unknown_visits = visits.filter(district__isnull=True).count()
            extra_context = {
                'total_visits': total_visits,
                'unknown_visits': unknown_visits,
                'city': city,
            }
        elif district:
            visits = Numberofvisits.objects.filter(district=district)
            total_visits = visits.count()
            unknown_visits = visits.filter(city__isnull=True).count()
            extra_context = {
                'total_visits': total_visits,
                'unknown_visits': unknown_visits,
                'district': district,
            }
        return super().changelist_view(request, extra_context=extra_context)

    # Add custom actions for viewing details
    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'view_by_district' in actions:
            del actions['view_by_district']
        if 'view_by_city' in actions:
            del actions['view_by_city']
        return actions

    def view_by_district(self, request, queryset):
        district = request.GET.get('district')
        if district:
            # Filter visits by the selected district
            visits = queryset.filter(district=district)
            # Here you can add more logic to display detailed information if needed
        else:
            # Handle the case where no district is selected
            self.message_user(request, "Please select a district to view.")
    view_by_district.short_description = "View Visits by District"

    def view_by_city(self, request, queryset):
        city = request.GET.get('city')
        if city:
            # Filter visits by the selected city
            visits = queryset.filter(city=city)
            # Here you can add more logic to display detailed information if needed
        else:
            # Handle the case where no city is selected
            self.message_user(request, "Please select a city to view.")
    view_by_city.short_description = "View Visits by City"


class ContactNumberAdmin(admin.ModelAdmin):
	list_display = ['phone_number','Time','is_seen','remarks']

class ContactAdmin(admin.ModelAdmin):
	list_display = ['name','place','number','comments','date','is_seen']
      
class SubproductExternalLinksAdmin(admin.ModelAdmin):
    list_display = ['subproduct']

class CredentialAdmin(admin.ModelAdmin):
    list_display=['type_of_image','title']
    
class CommentAdmin(admin.ModelAdmin):
    list_display=['name','comment','date']

class BlogAdmin(admin.ModelAdmin):
    list_display=['id','blog_heading']

class SubProductAdmin(admin.ModelAdmin):
	list_display=['name','product','order_no']
	ordering = ['product']
	list_editable = ['product','order_no']
	prepopulated_fields = {'slug':('name',)}
	search_fields = ['name', 'product__name','product__category']

class ProductAdmin(admin.ModelAdmin):
	list_display = ['name','order_no','category']
	ordering = ['order_no']
	list_editable = ['order_no','category']
	prepopulated_fields = {'slug':('name',)}
	search_fields = ['name', 'category']

class ReviewAdmin(admin.ModelAdmin):
	list_display = ['product',"review_token",'name','rating','review','is_approved','whatsapp_no']
	list_editable = ['is_approved','rating']
	search_fields = ['product']

class IntechIntroAdmin(admin.ModelAdmin):
      list_display = ['title', 'intro_text']
      
class IntechCountryAdmin(admin.ModelAdmin):
    list_display = ['country']
    prepopulated_fields = {'country_slug':('country',)}
    
class IntechProductAdmin(admin.ModelAdmin):
      list_display = ['product_name','get_country','product_class']
      prepopulated_fields = {'product_slug':('product_name',)}
      search_fields = ['product_name']
      
      def get_country(self, obj):
            return obj.category.country.country_slug
      get_country.short_description = 'Country'

class IntechFeedbackAdmin(admin.ModelAdmin):
      list_display = ['user_name', 'user_phone','product','user_feedback']

class IntechSellerProductImageInline(admin.TabularInline):
      model=IntechSellerProductImage
      extra=0
      
class IntechSellerAdmin(admin.ModelAdmin):
	inlines=[IntechSellerProductImageInline]
	list_display = ['seller_name','seller_company','seller_email_id']

class ATSContactProductImagesInline(admin.StackedInline):
      model = ATSContactProductImages
      extra = 1

class ATSContactProductInfoInline(admin.StackedInline):
      model = ATSContactProductInfo
      extra = 1
      
class ATSContactInfoAdmin(admin.ModelAdmin):
      inlines = [ATSContactProductInfoInline, ATSContactProductImagesInline]
      list_display = ['category','contact_company_name','contact_name','contact_email']

class ATSSellerProductImageInline(admin.StackedInline):
      model=ATSSellerProductImage
      extra=0
      
class ATSSellerAdmin(admin.ModelAdmin):
	inlines=[ATSSellerProductImageInline]
	list_display = ['seller_name','seller_company','seller_email_id']

class ATSInfoAdmin(admin.ModelAdmin):
      list_display = ['category_name','product_category']
      prepopulated_fields={'category_slug':('category_name', )}

class KCenterTopicAdmin(admin.ModelAdmin):
	list_display = ['ktopic']
	prepopulated_fields = {'ktopic_slug':('ktopic',)}
	def get_form(self, request, obj=None, **kwargs):
		form = super().get_form(request, obj, **kwargs)
		form.base_fields['text8'].label = 'URL '
		return form

admin.site.register(Subproduct_External_links, SubproductExternalLinksAdmin)
admin.site.register(Logo)
admin.site.register(Banner)
admin.site.register(Home_Information)
admin.site.register(Highlights)
admin.site.register(Product,ProductAdmin)
admin.site.register(SubProduct,SubProductAdmin)
admin.site.register(Blogs,BlogAdmin)
admin.site.register(Brands)
admin.site.register(SeoPageExtLinks)
admin.site.register(Credentials,CredentialAdmin)
admin.site.register(Comments,CommentAdmin)
admin.site.register(Contacts,ContactAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(ReviewResponse)
admin.site.register(IntechIntro,IntechIntroAdmin)
admin.site.register(IntechCountry,IntechCountryAdmin)
admin.site.register(IntechCategoryDetails)
admin.site.register(IntechProduct, IntechProductAdmin)
admin.site.register(IntechFeedback,IntechFeedbackAdmin)
admin.site.register(IntechSeller, IntechSellerAdmin)
admin.site.register(IntechRoadmap)
admin.site.register(KCenter)
admin.site.register(ATSIntro)
admin.site.register(ATSInfo, ATSInfoAdmin)
admin.site.register(ATSContactInfo, ATSContactInfoAdmin)
admin.site.register(ATSSeller, ATSSellerAdmin)
admin.site.register(FeaturedListing)
admin.site.register(kcentertopic,KCenterTopicAdmin)
admin.site.register(ContactNumber,ContactNumberAdmin)
admin.site.register( Numberofvisits, NumberofvisitsAdmin)