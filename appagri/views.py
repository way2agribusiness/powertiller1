from django.views.generic import ListView
from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Home_Information, SubProduct, Highlights, Banner, Post, Webinfo, Blogs, Videos, Product_Gallery, Logo, Contact, Problem, Homeproblem, Homeimg,  Brands
from .models import Product_Page_Links, Home_Page_Links, Home_key, Videos_key, Blogs_key, Contact_key, Compare_key 
from .models import Home_meta, Videos_meta, Blog_meta, Contact_meta, Compare_meta
from django.shortcuts import render, get_object_or_404

class HomgPage(ListView):
    http_method_names = ["get"]
    template_name = "homepage.html"
    model = Post
    context_object_name = "posts"
    queryset = Post.objects.all().order_by('-id')[0:30]

def home(request):
    keys = Home_key.objects.all()
    meta = Home_meta.objects.all()
    logo = Logo.objects.all()
    brands = Brands.objects.all()
    highlight = Highlights.objects.all()
    banners = Banner.objects.all()
    main_info = Home_Information.objects.all()
    webinfo = Webinfo.objects.all()
    products = Product.objects.all()
    prob = Homeproblem.objects.all()
    probimg = Homeimg.objects.all()
    link = Home_Page_Links.objects.all()
    sub_products = SubProduct.objects.all()
    return render(request, 'home.html', {'products': products, 'banners': banners, 'main_info': main_info, 'webinfo':webinfo, 'highlight': highlight, 'sub_products': sub_products, 'logo': logo, 'prob': prob, 'probimg': probimg, 'brands': brands, 'link': link, 'keys':keys, 'meta': meta})

def product_details(request, product_name, product_id):
    link = Product_Page_Links.objects.all()
    logo = Logo.objects.all()
    products = Product.objects.all()
    product = get_object_or_404(Product, pk=product_id)
    gallery = Product_Gallery.objects.all()
    sub_products = product.subproduct_set.all()
    subproducts = SubProduct.objects.filter(product=product)
    links = product.external_links.all()
    return render(request, 'product_details.html', {'products': products,'product': product, 'sub_products': sub_products, 'subproducts': subproducts, 'gallery': gallery, 'logo': logo, 'links':links, 'link': link})

def sub_product_details(request, sub_product_name, sub_product_id):
    logo = Logo.objects.all()
    sub_product = get_object_or_404(SubProduct, pk=sub_product_id)
    parent = sub_product.product
    return render(request, 'sub_product_details.html', {'sub_product': sub_product, 'logo': logo, 'parent': parent})

def product(request):
    logo = Logo.objects.all()
    products = Product.objects.all()
    return render(request, 'products.html', {'products': products, 'logo': logo})
    

def compare(request):
    keys = Compare_key.objects.all()
    meta = Compare_meta.objects.all()
    logo = Logo.objects.all()
    products = Product.objects.all()
    sub_products = SubProduct.objects.all()
    return render(request, 'compare.html', {'products': products,'sub_products': sub_products, 'logo': logo, 'keys':keys, 'meta': meta})

def blogs(request):
    meta = Blog_meta.objects.all()
    keys = Blogs_key.objects.all()
    logo = Logo.objects.all()
    blog = Blogs.objects.all()
    return render(request, 'blogs.html', {'blog': blog, 'logo': logo, 'keys':keys, 'meta': meta})

def videos(request):
    meta = Videos_meta.objects.all()
    keys = Videos_key.objects.all()
    logo = Logo.objects.all()
    video = Videos.objects.all()
    gallery = Product_Gallery.objects.all()
    return render(request, 'videos.html', {'video': video, 'gallery': gallery, 'logo': logo, 'keys':keys, 'meta': meta})

def contact(request):
    keys = Contact_key.objects.all()
    logo = Logo.objects.all()
    meta = Contact_meta.objects.all()
    if  request.method == "POST":
        contact = Contact()
        name = request.POST.get('name')
        number = request.POST.get('number')
        subject = request.POST.get('subject')
        contact.name=name
        contact.number=number
        contact.subject=subject
        contact.save()
        return HttpResponse("<h2>Thanks for contacting us</h2><br><p>we will get in touch with you soon</p>")
    return render(request, 'contact.html', {'logo': logo, 'keys':keys, 'meta': meta})

def problem(request):
    logo = Logo.objects.all()
    if  request.method == "POST":
        problem = Problem()
        name = request.POST.get('name')
        number = request.POST.get('number')
        place = request.POST.get('place')
        image = request.POST.get('image')
        subject = request.POST.get('subject')
        problem.name=name
        problem.number=number
        problem.subject=subject
        problem.place=place
        problem.image=image
        problem.save()
        return HttpResponse("<h2>Thanks for contacting us</h2><br><p>we will get in touch with you soon</p>")
    return render(request, 'help.html', {'logo': logo})

