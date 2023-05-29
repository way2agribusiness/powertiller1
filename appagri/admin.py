from django.contrib import admin
from .models import Post, Product, SubProduct, Banner, Highlights, Home_Information, Webinfo, Blogs, Videos, Product_Gallery, Logo, Contact, Problem, Homeproblem
from .models import Problem, Homeimg, Brands, Product_External_links, Home_Page_Links,Product_Page_Links
from .models import Home_key, Videos_key, Blogs_key, Contact_key, Compare_key, Home_meta, Videos_meta, Blog_meta, Contact_meta, Compare_meta
class PostAdmin(admin.ModelAdmin):
    pass
admin.site.register(Post, PostAdmin)
admin.site.register(Logo)
admin.site.register(Banner)
admin.site.register(Home_Information)
admin.site.register(Highlights)
admin.site.register(Product)
admin.site.register(Product_Gallery)
admin.site.register(SubProduct)
admin.site.register(Blogs)
admin.site.register(Videos)
admin.site.register(Webinfo)
admin.site.register(Contact)
admin.site.register(Homeimg)
admin.site.register(Homeproblem)
admin.site.register(Brands)
admin.site.register(Product_External_links)
admin.site.register(Product_Page_Links)
admin.site.register(Home_Page_Links)
admin.site.register(Home_key)
admin.site.register(Videos_key)
admin.site.register(Blogs_key)
admin.site.register(Contact_key)
admin.site.register(Compare_key)
admin.site.register(Home_meta)
admin.site.register(Videos_meta)
admin.site.register(Blog_meta)
admin.site.register(Contact_meta)
admin.site.register(Compare_meta)

class ProblemAdmin(admin.ModelAdmin):
    list_display = ('name', 'number', 'place', 'subject', 'image_tag', 'date')

admin.site.register(Problem, ProblemAdmin)