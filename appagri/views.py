from django.views.generic import ListView
from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from .models import Product,ContactNumber, Numberofvisits,Home_Information, IntechIntro, IntechCountry, IntechCategoryDetails, IntechProduct, IntechRoadmap,IntechSeller, SubProduct, Highlights, Banner, Blogs, Logo, Brands, Review, ReviewResponse, GlobalAgritechProductAvgRating
from .models import KCenter,SeoPageExtLinks,Subproduct_External_links,Comments,Contacts,Credentials, IntechFeedback, ATSInfo, ATSContactInfo, ATSIntro, ATSContactProductInfo,ATSSeller,ATSContactProductImages, Contacts, FeaturedListing, kcentertopic
from .forms import CommentForm, ReviewForm, FeedbackForm, SellerForm, ATSSellerForm,IntechSellerProductImageFormSet,ATSSellerProductImageFormSet, ContactForm
from django.urls import reverse
from itertools import groupby
import uuid
import json
from django.db.models import Count, Avg
import phonenumbers
from django.core.exceptions import ValidationError
from .notifications import send_notification
from rest_framework import viewsets
from .serializers import ATSSerializer, ATSContactSerializer, ATSIntroSerializer, ATSContactProductSerializer, ATSContactProductImagesSerializer, ContactsSerializer,FeaturedListingSerializer
import requests
import datetime
from django.utils import timezone
from django.utils.text import slugify

#For review we are taking IP Address
def getIP(request):
		x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
		if x_forwarded_for:
			ip = x_forwarded_for.split(',')[0]
		else:
			ip = request.META.get('REMOTE_ADDR')
		return ip

def get_ip_location(ip_address):
    api_key = '388b113bade3497c80d9925299af70b7'
    api_url = f'https://ipgeolocation.abstractapi.com/v1/?api_key={api_key}&ip_address={ip_address}'
    response = requests.get(api_url)
    return response.content

#Model View Set for Featured Listing
class FeaturedListingViewSet(viewsets.ModelViewSet):
	queryset = FeaturedListing.objects.all()
	serializer_class = FeaturedListingSerializer

def get_location(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		city = data.get('city')
		stateDistrict =data.get('stateDistrict')
		district =data.get('district')
		county =data.get('county')
		region = data.get('region')

		request.session['city'] = city
		request.session['region'] = region
		request.session['stateDistrict'] = stateDistrict
		request.session['district'] = district
		request.session['county'] = county
		return JsonResponse({'success': True})
	return JsonResponse({'success': False})
#Home View
def home(request):
	seo = SeoPageExtLinks.objects.all()
	title=''
	desc=''
	key=''
	for i in seo:
		if i.page == 'home':
			title = i.meta_title
			desc = i.meta_description
			key = i.keywords
	city =request.session.get('city') or "Unknown"
	district=request.session.get('district') or "Unknown"
	region=request.session.get('region') or "Unknown"
	noofentries=Numberofvisits.objects.create(city=city,district=district,region=region)
	logo = Logo.objects.all()
	brands = Brands.objects.all()
	highlight = Highlights.objects.all()
	banners = Banner.objects.all()
	main_info = Home_Information.objects.all()
	products = Product.objects.order_by('order_no')
	categories=[]
	for i in products:
		if i.category not in categories:
			categories = categories + [i.category]
	sub_products = SubProduct.objects.order_by('product','order_no')
	max_stars=range(5)
	url = request.build_absolute_uri(request.path)
	imp_reviews = Review.objects.filter(is_important=True)
	total_reviews = Review.objects.count()
	avg_rating_query = Review.objects.aggregate(avg_rating=Avg('rating'))
	if avg_rating_query['avg_rating'] is not None:
		avg_rating = round(avg_rating_query['avg_rating'], 1)
	else:
		avg_rating=0.0;
	percentage5 = int((Review.objects.filter(rating=5).count()/total_reviews)*100 if total_reviews >0 else 0)
	percentage4 = int((Review.objects.filter(rating=4).count()/total_reviews)*100 if total_reviews >0 else 0)
	percentage3 = int((Review.objects.filter(rating=3).count()/total_reviews)*100 if total_reviews >0 else 0)
	percentage2 = int((Review.objects.filter(rating=2).count()/total_reviews)*100 if total_reviews >0 else 0)
	percentage1 = int((Review.objects.filter(rating=1).count()/total_reviews)*100 if total_reviews >0 else 0)
	if request.method == 'POST':
		data=request.POST.get('number')
		if data:
			try:
				val_num=phonenumbers.parse(data,'IN')
				if not phonenumbers.is_valid_number(val_num) or str(val_num.national_number)[0] not in ['9','8','7','6']:
					return HttpResponseRedirect(request.path)
				else:
					city =request.session.get('city')
					district=request.session.get('district')
					stateDistrict=request.session.get('stateDistrict')
					county =request.session.get('county')
					region=request.session.get('region')
					number=ContactNumber.objects.create(phone_number=data,Time=timezone.now(),city=city,district=district,stateDistrict=stateDistrict,county=county,region=region)
					number.save()
					return HttpResponseRedirect(request.path)
			except:
				return HttpResponseRedirect(request.path)
	url_featured_listing = request.build_absolute_uri(reverse('appagri:featured_listing-list'))
	response = requests.get(url_featured_listing)
	if response.status_code==200:
		featured_data = response.json()
	return render(request, 'home.html', {'canonical':url, 'max_stars':max_stars,'products': products, 'banners': banners, 'main_info': main_info, 
                                        'highlight': highlight, 'sub_products': sub_products, 'logo': logo,'brands': brands,'title':title,'desc':desc,'key':key,
                                         'categories':categories,'total_review':total_reviews,'avg_rating':avg_rating,'per5':percentage5,'per4':percentage4,'per3':percentage3,
                                         'per2':percentage2,'per1':percentage1,'imp_reviews':imp_reviews,'featured_data':featured_data})

#Product Category Web Page
def product_details(request, product_slug):
	logo = Logo.objects.all()
	products = Product.objects.order_by('order_no')
	product = get_object_or_404(Product, slug=product_slug)
	categories=[]
	for i in products:
		if i.category not in categories:
			categories = categories + [i.category]
	sub_products = product.subproduct_set.order_by('order_no')
	subproducts = SubProduct.objects.filter(product=product)
	url = request.build_absolute_uri(request.path)
	return render(request, 'product_details.html', {'canonical':url, 'products': products,'product': product, 'sub_products': sub_products, 'subproducts': subproducts,'logo': logo,'categories':categories,'product_slug':product_slug})

#Product specific Web Page
def sub_product_details(request, sub_product_product, sub_product_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	sub_product = get_object_or_404(SubProduct.objects.order_by('order_no'), slug=sub_product_slug)
	seo = Subproduct_External_links.objects.all()
	title=''
	desc=''
	key=''
	for i in seo:
		if i.subproduct == sub_product:
			title = i.meta_title
			desc = i.meta_desc
			key = i.keywords
	parent = sub_product.product
	reviews = Review.objects.all()
	try:
		product_reviews = Review.objects.filter(product=sub_product.name, is_approved=True).order_by('-rating')
		total_user = Review.objects.filter(product=sub_product.name, is_approved=True).aggregate(total_count=Count('name'))
		average_rating = product_reviews.aggregate(avg_rating=Avg('rating'))
		if average_rating['avg_rating'] is not None and total_user['total_count'] > 0:
			total_rating = average_rating['avg_rating'] * total_user['total_count']
			total_user_count = total_user['total_count']
			total_rate = total_rating / total_user_count
		else:
			total_rate = None
	except Review.DoesNotExist:
		product_reviews = None
	#response = AdminReply.objects.all()
	return render(request, 'sub_product_details.html', {'canonical':url, 'sub_product': sub_product, 'logo': logo, 'parent': parent,'title':title,'desc':desc,'key':key,'reviews':reviews,'product_reviews':product_reviews,'total_rate':total_rate})

#Product Review Related Operation Handling
def review_view(request, sub_product_product, sub_product_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	sub_product = get_object_or_404(SubProduct.objects.order_by('order_no'), slug=sub_product_slug)
	seo = Subproduct_External_links.objects.all()
	title=''
	desc=''
	key=''
	for i in seo:
		if i.subproduct == sub_product:
			title = i.meta_title
			desc = i.meta_desc
			key = i.keywords
	device_ip = getIP(request)
	if request.method == 'POST':
		rating_form = ReviewForm(request, data=request.POST, files=request.FILES)
		if rating_form.is_valid():
			review = rating_form.save(commit=False)
			review.product = sub_product.name
			review.review_token = uuid.uuid4().hex[:10]
			review.ip_address = device_ip
			review.date=datetime.date.today()
			try:
				parsed_number = phonenumbers.parse(review.whatsapp_no,'IN')
				if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
					rating_form = ReviewForm(request, data=request.POST, files=request.FILES)
					return render(request,'product_review.html',{'sub_product_product':sub_product_product,'sub_product_slug':sub_product_slug,'rating_form':rating_form,'sub_product':sub_product,'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message})
				elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
					rating_form = ReviewForm(request,data=request.POST, files=request.FILES)
					return render(request,'product_review.html',{'sub_product_product':sub_product_product,'sub_product_slug':sub_product_slug,'rating_form':rating_form,'sub_product':sub_product,'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message})
				elif not phonenumbers.is_valid_number(parsed_number):
					message = 'Invalid Phone Number: must be of 10 digit'
					rating_form = ReviewForm(request,data=request.POST, files=request.FILES)
					return render(request,'product_review.html',{'sub_product_product':sub_product_product,'sub_product_slug':sub_product_slug,'rating_form':rating_form,'sub_product':sub_product,'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message})
			except phonenumbers.phonenumberutil.NumberParseException:
				message = 'Invalid Phone number'
				rating_form = ReviewForm(request, data=request.POST, files=request.FILES)
				return render(request,'product_review.html',{'sub_product_product':sub_product_product,'sub_product_slug':sub_product_slug,'rating_form':rating_form,'sub_product':sub_product,'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message})
			review.save()
			instance = Review.objects.get(id=review.id)
			subject = f'powertiller.in: {instance.product} review'
			message = f'''<strong>Review for <span style="color:darkgreen">{instance.product}</span></strong> from <em style="color:darkblue">powertiller.in</em>.<br>
            		 <strong>Customer Name: </strong>{instance.name}<br>
                     <strong>Phone number: </strong>{instance.whatsapp_no}<br>
                     <strong>Rating: </strong>{instance.rating}<br>
                     {'<strong>Product Review: </strong> '+ instance.review if instance.review else ''}'''
			recipient_list = ['way2agritech@way2agribusiness.com']
			send_notification(subject, message, recipient_list)
			return redirect(reverse('appagri:sub_product_details-sucess', args=[sub_product_slug]))
		else:
			message = ''
			for field, errors in rating_form.errors.items():
				for error in errors:
					message += f"{error}\n"
			return render(request,'product_review.html',{'sub_product_product':sub_product_product,'sub_product_slug':sub_product_slug,'rating_form':rating_form,'sub_product':sub_product,'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message})
	else:
		rating_form = ReviewForm(request)
	return render(request, 'product_review.html',{'sub_product_product':sub_product_product,'sub_product_slug':sub_product_slug,'rating_form':rating_form,'sub_product':sub_product,'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key})

#Product Review Success Web Page
def review_sucess_view(request, sub_product_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	sub_product = get_object_or_404(SubProduct.objects.order_by('order_no'), slug=sub_product_slug)
	return render(request, 'review_sucess.html',{'sub_product':sub_product, 'logo':logo,'canonical':url})

#Product Web Pages
def product(request):
	logo = Logo.objects.all()
	products = Product.objects.all()
	url = request.build_absolute_uri(request.path)
	return render(request, 'products.html', {'canonical':url, 'products': products, 'logo': logo})

#Product Compare Web Page
def compare(request, sub_product_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	sub_products = SubProduct.objects.all()
	sub_product = SubProduct.objects.get(slug=sub_product_slug)
	pw_pt = SubProduct.objects.filter(product__name__in=['Power Weeder', 'Power Tiller'])
	sprayers = SubProduct.objects.filter(product__name__contains='Sprayer')
	sub_product_specs={}
	for i in range(1, 16):
		key_attr = f'Key_{i}'
		value_attr = f'Value_{i}'
		key = getattr(sub_product, key_attr)
		value = getattr(sub_product, value_attr)
		if sub_product.product.name not in sub_product_specs:
			sub_product_specs[sub_product.product.name] = {}
		sub_product_specs[sub_product.product.name][key] = value
	if request.method=='POST':
		selected_value = request.POST['dropdown1']
		selected_product = SubProduct.objects.get(name=selected_value)
		return redirect('appagri:compare-2-products',sub_product_slug=sub_product_slug, sub_product1_slug=selected_product.slug)
	context={
		'canonical':url, 
		'sub_products': sub_products, 
		'sub_product':sub_product,
		'logo': logo, 
		'sub_product_specs':sub_product_specs,	
    	'pw_pt':pw_pt,
    	'sprayers':sprayers
    }
	return render(request, 'compare.html', context)

#2nd Product Compare Form Handling
def compare_2_products(request, sub_product_slug, sub_product1_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	sub_products = SubProduct.objects.all()
	sub_product = SubProduct.objects.get(slug=sub_product_slug)
	sub_product_specs={}
	selected_product = SubProduct.objects.get(slug=sub_product1_slug)
	sub_product_specs1={}
	pw_pt = SubProduct.objects.filter(product__name__in=['Power Weeder', 'Power Tiller'])
	sprayers = SubProduct.objects.filter(product__name__icontains='Sprayer')
	for i in range(1, 16):
		key_attr = f'Key_{i}'
		value_attr = f'Value_{i}'
		key = getattr(sub_product, key_attr)
		value = getattr(sub_product, value_attr)
		if sub_product.product.name not in sub_product_specs:
			sub_product_specs[sub_product.product.name] = {}
		sub_product_specs[sub_product.product.name][key] = value
	for i in range(1,16):
		key_attr1 = f'Key_{i}'
		value_attr1 = f'Value_{i}'
		key = getattr(selected_product, key_attr1)
		value = getattr(selected_product, value_attr1)
		sub_product_specs1[key] = value
	context={
			'canonical':url, 
			'sub_products': sub_products, 
			'sub_product':sub_product,
			'logo': logo, 
			'sub_product_specs':sub_product_specs,	
			'selected_product':selected_product,
			'sub_product_specs1':sub_product_specs1,
    		'pw_pt':pw_pt,
    		'sprayers':sprayers
	}
	if request.method=='POST':
		if 'dropdown1' in request.POST:
			selected_value = request.POST['dropdown1']
			selected_product = SubProduct.objects.get(name=selected_value)
			return redirect('appagri:compare-2-products',sub_product_slug=sub_product_slug, sub_product1_slug=selected_product.slug)
		elif 'dropdown2' in request.POST:
			selected_value1 = request.POST['dropdown2']
			selected_product1 = SubProduct.objects.get(name=selected_value1)
			return redirect('appagri:compare-3-products',sub_product_slug=sub_product_slug, sub_product1_slug=sub_product1_slug, sub_product2_slug=selected_product1.slug)
	return render(request, 'compare-3rd-products.html', context)

#3rd Product Compare Form Handling
def compare_3_products(request, sub_product_slug, sub_product1_slug, sub_product2_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	sub_products = SubProduct.objects.all()
	sub_product = SubProduct.objects.get(slug=sub_product_slug)
	sub_product_specs={}
	selected_product = SubProduct.objects.get(slug=sub_product1_slug)
	sub_product_specs1={}
	selected_product1 = SubProduct.objects.get(slug=sub_product2_slug)
	sub_product_specs2={}
	pw_pt = SubProduct.objects.filter(product__name__in=['Power Weeder', 'Power Tiller'])
	sprayers = SubProduct.objects.filter(product__name__icontains='Sprayer')
	for i in range(1, 16):
		key_attr = f'Key_{i}'
		value_attr = f'Value_{i}'
		key = getattr(sub_product, key_attr)
		value = getattr(sub_product, value_attr)
		if sub_product.product.name not in sub_product_specs:
			sub_product_specs[sub_product.product.name] = {}
		sub_product_specs[sub_product.product.name][key] = value
	for i in range(1,16):
		key_attr1 = f'Key_{i}'
		value_attr1 = f'Value_{i}'
		key = getattr(selected_product, key_attr1)
		value = getattr(selected_product, value_attr1)
		sub_product_specs1[key] = value
	for i in range(1,16):
		key_attr2 = f'Key_{i}'
		value_attr2 = f'Value_{i}'
		key = getattr(selected_product1, key_attr2)
		value = getattr(selected_product1, value_attr2)
		sub_product_specs2[key] = value
	context={
		'canonical':url, 
		'sub_products': sub_products, 
		'sub_product':sub_product,
		'logo': logo, 
		'sub_product_specs':sub_product_specs,
		'selected_product':selected_product,
		'sub_product_specs1':sub_product_specs1,	
		'selected_product1':selected_product1,
		'sub_product_specs2':sub_product_specs2,
    	'pw_pt':pw_pt,
    	'sprayers':sprayers
	}
	if request.method=='POST':
		if 'dropdown1' in request.POST:
			selected_value = request.POST['dropdown1']
			selected_product = SubProduct.objects.get(name=selected_value)
			return redirect('appagri:compare-3-products',sub_product_slug=sub_product_slug, sub_product1_slug=selected_product.slug, sub_product2_slug=sub_product2_slug)
		elif 'dropdown2' in request.POST:
			selected_value1 = request.POST['dropdown2']
			selected_product1 = SubProduct.objects.get(name=selected_value1)
			return redirect('appagri:compare-3-products',sub_product_slug=sub_product_slug, sub_product1_slug=sub_product1_slug, sub_product2_slug=selected_product1.slug)
	return render(request, 'compare-3rd-products.html', context)

#Video Blogs Web Page Handling
def blogs(request):
	seo = SeoPageExtLinks.objects.all()
	title=''
	desc=''
	key=''
	for i in seo:
		if i.page == 'video blogs':
			title = i.meta_title
			desc = i.meta_description
			key = i.keywords
	logo = Logo.objects.all()
	blog = Blogs.objects.all()
	if request.method == 'POST':
		comment_form = CommentForm(data=request.POST)
		if comment_form.is_valid():
			comment = comment_form.save(commit=False)
			video_id = request.POST.get('video_id')
			comment.video = get_object_or_404(Blogs, pk=video_id)
			comment.save()
		return HttpResponseRedirect(reverse('appagri:blogs'))
	else:
		comment_form = CommentForm()
	comments = Comments.objects.all().order_by('-id')
	url = request.build_absolute_uri(request.path)
	return render(request, 'blogs.html', {'canonical':url, 'blog': blog, 'logo': logo,'form':comment_form,'comment':comments,'title':title,'desc':desc,'key':key})

#About Us Handling 
def about(request):
	seo = SeoPageExtLinks.objects.all()
	title=''
	desc=''
	key=''
	for i in seo:
		if i.page == 'aboutus':
			title = i.meta_title
			desc = i.meta_description
			key = i.keywords
	logo = Logo.objects.all()
	brands = Brands.objects.all()
	c_images = Credentials.objects.order_by('type_of_image')
	grouped_images = []
	for key, group in groupby(c_images, key=lambda x: x.get_type_of_image_display()):
		grouped_images.append({'type_of_image': key, 'images': list(group)})
	url = request.build_absolute_uri(request.path)
	return render(request,'aboutus.html',{'canonical':url,'logo':logo,'brands':brands,'grouped_images':grouped_images,'title':title,'desc':desc,'key':key})

#Contact Us Form Handling
def contact(request):
	url = request.build_absolute_uri(request.path)
	highlight = Highlights.objects.all()
	seo = SeoPageExtLinks.objects.filter(page="contactus").first()
	title=seo.meta_title if seo else ''
	desc=seo.meta_description if seo else ''
	key=seo.keywords if seo else ''
	logo = Logo.objects.all()
	if request.method == "POST":
		form = ContactForm(data=request.POST)
		if form.is_valid():
			number = form.cleaned_data['number']
			try:
				parsed_number = phonenumbers.parse(number,'IN')
				if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
					form = ContactForm(data=request.POST)
					return render(request, 'contact.html',{'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message,'form':form, 'message':message,'highlight':highlight})
				elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
					form = ContactForm(data=request.POST)
					return render(request, 'contact.html',{'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message,'form':form, 'message':message,'highlight':highlight})
				elif not phonenumbers.is_valid_number(parsed_number):
					message = 'Invalid Phone Number: must be of 10 digit'
					form = ContactForm(data=request.POST)
					return render(request, 'contact.html',{'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message,'form':form, 'message':message,'highlight':highlight})
			except phonenumbers.phonenumberutil.NumberParseException:
				message = 'Invalid Phone number'
				form = ContactForm(data=request.POST)
				return render(request, 'contact.html',{'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'message':message,'form':form, 'message':message,'highlight':highlight})
			main_instance=form.save()
			instance = Contacts.objects.get(id=main_instance.id)
			subject = 'Message from Contact Us of powertiller.in'
			message = f'''Contact Us Message from <em style="color:darkblue">powertiller.in</em><br>
            		<strong>Customer Name: </strong>{instance.name}<br>
                    <strong>Phone number: </strong>{instance.number}<br>
                    <strong>Customer Message/Enquiry: </strong>{instance.comments}'''
			recipient_list = ['way2agritech@way2agribusiness.com']
			send_notification(subject, message, recipient_list)
			redirected_path=reverse('appagri:contactack')
			return redirect(redirected_path)
	else:
		form = ContactForm()
	return render(request, 'contact.html',{'canonical':url,'logo':logo,'title':title,'desc':desc,'key':key,'form':form,'highlight':highlight})

#Contact us Thank You Page
def thankyou(request):
	logo = Logo.objects.all()
	url=request.build_absolute_uri(request.path)
	return render(request,'contactus_thankyou.html',{'logo':logo,'canonical':url})

#Contact Us ModelView Set
class ContactsViewSet(viewsets.ModelViewSet):
	queryset = Contacts.objects.all
	serializer_class = ContactsSerializer

#KCenter View

def kcenter_view(request):
	seo = SeoPageExtLinks.objects.all()
	title=''
	desc=''
	key=''
	for i in seo:
		if i.page == 'kcenter':
			title = i.meta_title
			desc = i.meta_description
			key = i.keywords
	logo = Logo.objects.all()
	contents = KCenter.objects.all()
	url = request.build_absolute_uri(request.path)
	items = kcentertopic.objects.all()
	return render(request,'kcenter.html',{'items':items,'logo':logo,'contents':contents,'canonical': url, 'title':title,'desc':desc,'key':key})

#Backlinks Handling View
def BacklinksView(request):
	logo = Logo.objects.all()
	links_list = SeoPageExtLinks.objects.values_list('backlinks', flat=True)
	links_list = [links.split(',') for links in links_list if links]
	unique_links = [list(set(sublist)) for sublist in links_list]
	return render(request, 'backlinks.html',{'links_list':unique_links,'logo':logo})

#Global Agritech Handling
def intech_view(request):
    seo = SeoPageExtLinks.objects.filter(page='global_agritech')
    title = seo.meta_title if seo else ''
    desc = seo.meta_description if seo else ''
    key = seo.keywords if seo else ''
    logo = Logo.objects.all()
    intro = IntechIntro.objects.all()
    intech_country = IntechCountry.objects.all()
    country_category = {}

    # Loop through each country and safely retrieve category details
    for country in intech_country:
        # Use filter() to avoid DoesNotExist exception
        category = IntechCategoryDetails.objects.filter(country=country).first()  # This will return None if no category found
        country_category[country] = category  # Add category to the dictionary, will be None if no category found

    # Attempt to get the roadmap, but if it doesn't exist, set it to None
    try:
        roadmaps = IntechRoadmap.objects.get(id=1)
    except IntechRoadmap.DoesNotExist:
        roadmaps = None

    url = request.build_absolute_uri(request.path)

    if request.method == 'POST':
        form = SellerForm(data=request.POST)
        image_formset = IntechSellerProductImageFormSet(data=request.POST, files=request.FILES, instance=IntechSeller())
        if form.is_valid() and image_formset.is_valid():
            phone = form.cleaned_data['seller_company']
            try:
                parsed_number = phonenumbers.parse(phone, 'IN')
                if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
                    message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
                    form = SellerForm(data=request.POST)
                    return render(request, 'intech.html', {
                        'logo': logo, 'intro': intro, 'countries': intech_country, 'country_categories': country_category, 'canonical': url,
                        'seo': seo, 'roadmaps': roadmaps, 'form': form, 'title': title, 'desc': desc, 'key': key, 'image_formset': image_formset,
                        'message': message
                    })
                elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
                    message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
                    form = SellerForm(data=request.POST)
                    return render(request, 'intech.html', {
                        'logo': logo, 'intro': intro, 'countries': intech_country, 'country_categories': country_category, 'canonical': url,
                        'seo': seo, 'roadmaps': roadmaps, 'form': form, 'title': title, 'desc': desc, 'key': key, 'image_formset': image_formset,
                        'message': message
                    })
                elif not phonenumbers.is_valid_number(parsed_number):
                    message = 'Invalid Phone Number: must be of 10 digits'
                    form = SellerForm(data=request.POST)
                    return render(request, 'intech.html', {
                        'logo': logo, 'intro': intro, 'countries': intech_country, 'country_categories': country_category, 'canonical': url,
                        'seo': seo, 'roadmaps': roadmaps, 'form': form, 'title': title, 'desc': desc, 'key': key, 'image_formset': image_formset,
                        'message': message
                    })
            except phonenumbers.phonenumberutil.NumberParseException:
                message = 'Invalid Phone number'
                form = SellerForm(data=request.POST)
                return render(request, 'intech.html', {
                    'logo': logo, 'intro': intro, 'countries': intech_country, 'country_categories': country_category, 'canonical': url,
                    'seo': seo, 'roadmaps': roadmaps, 'form': form, 'title': title, 'desc': desc, 'key': key, 'image_formset': image_formset,
                    'message': message
                })

            main_instance = form.save()
            image_formset.instance = main_instance
            image_formset.save()
            instance = IntechSeller.objects.get(id=main_instance.id)
            subject = 'powertiller.in: Global Agritech Seller Enquiry'
            message = f"""Global Agritech Seller Enquiry from powertiller.in.<br>
                        <strong style="color:darkgreen;">Customer Name:</strong> {instance.seller_name}<br>
                        <strong>Phone number:</strong> {instance.seller_company}<br>
                        <strong>Address:</strong> {instance.seller_address}"""
            recipient_list = ['way2agribusiness@gmail.com']
            send_notification(subject, message, recipient_list)
            return redirect(reverse('appagri:global-tech-seller-enquiry-success'))
    else:
        form = SellerForm()
        image_formset = IntechSellerProductImageFormSet()

    agritech_categories = [c.category_name for c in ATSInfo.objects.filter(product_category='Agritech')] + ['Agri Services']
    return render(request, 'intech.html', {
        'logo': logo, 'intro': intro, 'countries': intech_country, 'country_categories': country_category,
        'canonical': url, 'seo': seo, 'roadmaps': roadmaps, 'form': form, 'title': title, 'desc': desc,
        'key': key, 'image_formset': image_formset, 'agritech_categories': agritech_categories
    })


def global_agritech_country_category(request,country_name,category_type):
	seo = SeoPageExtLinks.objects.filter(page='global_agritech')
	title = seo.meta_title if seo else ''
	desc = seo.meta_description if seo else ''
	key = seo.keywords if seo else '' 
	logo = Logo.objects.all()
	intro = IntechIntro.objects.all()
	intech_country = IntechCountry.objects.all()
	selected_country_category = IntechCategoryDetails.objects.get(country__country_slug=country_name)
	country_category = {}
	for country in intech_country:
		category = IntechCategoryDetails.objects.get(country=country)
		country_category[country]=category
	cat_type = ATSInfo.objects.get(category_slug=category_type)
	products = IntechProduct.objects.filter(category__country__country_slug=country_name, product_class=cat_type.category_name)
	roadmaps = IntechRoadmap.objects.get(id=1)
	url = request.build_absolute_uri(request.path)
	if request.method == 'POST':
		form = SellerForm(data=request.POST)
		image_formset = IntechSellerProductImageFormSet(data=request.POST, files=request.FILES, instance=IntechSeller())
		if form.is_valid() and image_formset.is_valid():
			phone = form.cleaned_data['seller_company']
			try:
				parsed_number = phonenumbers.parse(phone,'IN')
				if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
					form = SellerForm(data=request.POST)
					return render(request, 'intech.html',{'logo':logo,'intro':intro,'countries':intech_country,'country_categories':country_category,'country_products':country_products,'canonical': url,'seo':seo, 'roadmaps':roadmaps,'form':form, 'title':title,'desc':desc,'key':key,'p':p,'image_formset':image_formset,'message':message,'category_types':category_types})
				elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
					form = SellerForm(data=request.POST)
					return render(request, 'intech.html',{'logo':logo,'intro':intro,'countries':intech_country,'country_categories':country_category,'country_products':country_products,'canonical': url,'seo':seo, 'roadmaps':roadmaps,'form':form, 'title':title,'desc':desc,'key':key,'p':p,'image_formset':image_formset,'message':message,'category_types':category_types})
				elif not phonenumbers.is_valid_number(parsed_number):
					message = 'Invalid Phone Number: must be of 10 digit'
					form = SellerForm(data=request.POST)
					return render(request, 'intech.html',{'logo':logo,'intro':intro,'countries':intech_country,'country_categories':country_category,'country_products':country_products,'canonical': url,'seo':seo, 'roadmaps':roadmaps,'form':form, 'title':title,'desc':desc,'key':key,'p':p,'image_formset':image_formset,'message':message,'category_types':category_types})
			except phonenumbers.phonenumberutil.NumberParseException:
				message = 'Invalid Phone number'
				form = SellerForm(data=request.POST)
				return render(request, 'intech.html',{'logo':logo,'intro':intro,'countries':intech_country,'country_categories':country_category,'country_products':country_products,'canonical': url,'seo':seo, 'roadmaps':roadmaps,'form':form, 'title':title,'desc':desc,'key':key,'p':p,'image_formset':image_formset,'message':message,'category_types':category_types})
			main_instance = form.save()
			image_formset.instance = main_instance
			image_formset.save()
			instance = IntechSeller.objects.get(id=main_instance.id)
			subject = 'powertiller.in: Global Agritech Seller Enquiry'
			message = f"""Global Agritech Seller Enquiry from powertiller.in.<br>
					<strong style="color:darkgreen;">Customer Name:</strong> {instance.seller_name}<br>
					<strong>Phone number:</strong> {instance.seller_company}<br>
					<strong>Address:</strong> {instance.seller_address}"""
			recipient_list = ['way2agribusiness@gmail.com']
			send_notification(subject, message, recipient_list)
			return redirect(reverse('appagri:global-tech-seller-enquiry-success'))
	else:
		form = SellerForm()
		image_formset = IntechSellerProductImageFormSet()
	agritech_categories = [c.category_name for c in ATSInfo.objects.filter(product_category='Agritech')]+['Agri Services']
	return render(request, 'global-agritech.html',{
		'logo':logo,'intro':intro,'countries':intech_country,'country_categories':country_category,
		'canonical': url,'seo':seo, 'roadmaps':roadmaps,'form':form, 'title':title,
		'desc':desc,'key':key,'image_formset':image_formset,'agritech_categories':agritech_categories,
		'products':products,'selected_country':selected_country_category,'country_name':country_name,'selected_category':cat_type})

#Global Agritech Product Feedback Form Handling
def intech_feedback_view(request, country_name, category_type, product_slug):
	logo = Logo.objects.all()
	url = request.build_absolute_uri(request.path)
	product = get_object_or_404(IntechProduct.objects.all(), product_slug=product_slug)
	if request.method == 'POST':
		form = FeedbackForm(data=request.POST)
		if form.is_valid():
			feedback_form = form.save(commit=False)
			feedback_form.product=product.product_name
			phone = request.POST.get('user_phone')
			try:
				parsed_number = phonenumbers.parse(phone,'IN')
				if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					error_message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
					form = FeedbackForm(data=request.POST)
					render(request,'intech_feedback.html',{'form':form,'canonical': url,'logo':logo,'error_message':error_message})
				elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
					error_message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
					form = FeedbackForm(data=request.POST)
					render(request,'intech_feedback.html',{'form':form,'canonical': url,'logo':logo,'error_message':error_message})
				elif not phonenumbers.is_valid_number(parsed_number):
					error_message = 'Invalid Phone Number: must be of 10 digit'
					form = FeedbackForm(data=request.POST)
					render(request,'intech_feedback.html',{'form':form,'canonical': url,'logo':logo,'error_message':error_message})
			except phonenumbers.phonenumberutil.NumberParseException:
				error_message = 'Invalid Phone number'
				form = FeedbackForm(data=request.POST)
				render(request,'intech_feedback.html',{'form':form,'canonical': url,'logo':logo,'error_message':error_message})
			feedback_form.save()
			instance = IntechFeedback.objects.get(id=feedback_form.id)
			subject = f'powertiller.in: Global Agritech User Feedback for {instance.product}'
			message = f'''Global Agritech User Feedback from <em style="color:darkblue">powertiller.in</em> for <strong style="color:darkgreen">{instance.product}<strong>.<br>
            		<strong>Customer Name: </strong>{instance.user_name}<br>
                    <strong>Phone number: </strong>{instance.user_phone}<br>
                    <strong>Address: </strong>{instance.user_feedback}'''
			recipient_list = ['dr.prasannad@way2agribusiness.com']
			send_notification(subject, message, recipient_list)
			return redirect(reverse('appagri:global-tech-feedback-sucess', args=[product_slug]))
	else:
		form = FeedbackForm()
	try:
		product_feedback = IntechFeedback.objects.filter(product=product.product_name)
		feedback_count = product_feedback.count()
		avg = round(sum(feedback.user_rating for feedback in product_feedback) / feedback_count, 1) if feedback_count > 0 else 0
	except IntechFeedback.DoesNotExist:
		return None
	try:
		product = get_object_or_404(IntechProduct.objects.all(), product_slug=product_slug)
		rating_product = GlobalAgritechProductAvgRating.objects.get(product=product.product_name)
		GlobalAgritechProductAvgRating.objects.update(product=rating_product.product, avg_rating=avg)
	except GlobalAgritechProductAvgRating.DoesNotExist:
		GlobalAgritechProductAvgRating.objects.create(product=product.product_name, avg_rating=avg)
	return render(request,'intech_feedback.html',{'form':form,'canonical': url,'logo':logo})

#Global Agritech Product Fedback Acknowledgement
def feedback_sucess_view(request, product_slug):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	product = get_object_or_404(IntechProduct.objects.all(), product_slug=product_slug)
	return render(request, 'global_tech_feedback_acknowledgement.html',{'product':product, 'logo':logo, 'canonical':url})

#Global Agritech Start to Scale Up form Success Handling
def seller_enquiry_success_view(request):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	return render(request, 'seller_enquiry_sucess.html', {'logo':logo, 'canonical':url})

#Agritech Mart Web Page Handling
def ats_view(request):
	logo = Logo.objects.all()
	try:
		roadmap = IntechRoadmap.objects.get(id=2)
	except IntechRoadmap.DoesNotExist:
		roadmap = None
	url = request.build_absolute_uri(request.path)
	url_ats_intro = request.build_absolute_uri(reverse('appagri:atsintro-list'))
	url_ats_info = request.build_absolute_uri(reverse('appagri:atsinfo-list'))
	url_ats_contact = request.build_absolute_uri(reverse('appagri:atscontactinfo-list'))
	response3 = requests.get(url_ats_intro)
	response1 = requests.get(url_ats_info)
	response2 = requests.get(url_ats_contact)
	data = intro = contact_info = None
	if response1.status_code == 200 and response2.status_code == 200 and response3.status_code == 200:
		data = response1.json()
		contact_info = response2.json() 
		intro = response3.json()
	if request.method == 'POST':
		if 'select-form2' in request.POST:
			value = request.POST.get('select-form2')
			url = reverse(f"appagri:{value.split('--')[1]}", args=[value.split('--')[2],value.split('--')[3]])
			return redirect(url)
		elif 'form1' in request.POST:
			form = ATSSellerForm(data=request.POST)
			image_formset = ATSSellerProductImageFormSet(data=request.POST, files=request.FILES, instance=ATSSeller())
			if form.is_valid() and image_formset.is_valid():
				phone = form.cleaned_data['seller_company']
				try:
					parsed_number = phonenumbers.parse(phone,'IN')
					if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
						message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
						form = ATSSellerForm(data=request.POST)
						return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro,'image_formset':image_formset,'message':message,'canonical':url, 'roadmap':roadmap})
					elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
						message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
						form = ATSSellerForm(data=request.POST)
						return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro,'image_formset':image_formset,'message':message,'canonical':url,'roadmap':roadmap})
					elif not phonenumbers.is_valid_number(parsed_number):
						message = 'Invalid Phone Number: must be of 10 digit'
						form = ATSSellerForm(data=request.POST)
						return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro,'image_formset':image_formset,'message':message,'canonical':url,'roadmap':roadmap})
				except phonenumbers.phonenumberutil.NumberParseException:
					message = 'Invalid Phone number'
					form = ATSSellerForm(data=request.POST)
					return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro,'image_formset':image_formset,'message':message,'canonical':url,'roadmap':roadmap})
				main_instance = form.save()
				image_formset.instance = main_instance
				image_formset.save()
				instance = ATSSeller.objects.get(id=main_instance.id)
				subject = 'powertiller.in: Agritech Mart Seller Enquiry'
				message = f'Agritech Mart Seller Enquiry from powertiller.in. Customer Name: {instance.seller_name}, Phone number: {instance.seller_company} and Address: {instance.seller_address}'
				recipient_list = ['dr.prasannad@way2agribusiness.com']
				send_notification(subject, message, recipient_list)
				return redirect(reverse('appagri:atm-seller-success'))
		else:
			return HttpResponse('none has been submiitted')
	form = ATSSellerForm() 
	image_formset = ATSSellerProductImageFormSet()
	return render(request, 'ats.html', {'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro,'image_formset':image_formset,'canonical':url,'roadmap':roadmap})

#Agritech Mart Company Name Selection Handling
def ats_category_company(request, category_slug, company_slug):
	logo = Logo.objects.all()
	try:
		roadmap = IntechRoadmap.objects.get(id=2)
	except IntechRoadmap.DoesNotExist:
		roadmap = None
	url = request.build_absolute_uri(request.path)
	url_ats_intro = request.build_absolute_uri(reverse('appagri:atsintro-list'))
	url_ats_info = request.build_absolute_uri(reverse('appagri:atsinfo-list'))
	url_ats_contact = request.build_absolute_uri(reverse('appagri:atscontactinfo-list'))
	url_ats_contact_product = request.build_absolute_uri(reverse('appagri:atscontactproductinfo-list'))
	url_ats_contact_product_images = request.build_absolute_uri(reverse('appagri:atscontactproductimages-list'))
	response1 = requests.get(url_ats_intro)
	response2 = requests.get(url_ats_info)
	response3 = requests.get(url_ats_contact)
	response4 = requests.get(url_ats_contact_product)
	response5 = requests.get(url_ats_contact_product_images)
	data = intro = None
	if response1.status_code == 200 and response2.status_code == 200 and response3.status_code==200 and response4.status_code==200 and response5.status_code==200:
		intro = response1.json()
		data = response2.json()
		contact_info = response3.json() 
		product_info = response4.json()
		product_images = response5.json()
		product_image_dict = {}
		for image in product_images:
			product_name = image['seller_product']['product_name']
			if product_name not in product_image_dict:
				product_image_dict[product_name] = [image['product_image']]
			else:
				product_image_dict[product_name].append(image['product_image'])
	if request.method == 'POST':
		if 'select-form2' in request.POST:
			category_slug = request.POST.get('selected-category')
			company_slug = request.POST.get('selected-company')
			if category_slug and company_slug:
				url = reverse(f"appagri:ats-category-company", args=[category_slug, company_slug])
				return redirect(url)
		elif 'form1' in request.POST:
			form = ATSSellerForm(data=request.POST)
			image_formset = ATSSellerProductImageFormSet(data=request.POST, files=request.FILES, instance=ATSSeller())
			if form.is_valid() and image_formset.is_valid():
				phone = form.cleaned_data['seller_company']
				try:
					parsed_number = phonenumbers.parse(phone,'IN')
					if not phonenumbers.is_valid_number(parsed_number) and str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
						message = 'Invalid Phone number: Must be of 10 digit length and Must start with 9, 8, 7 or 6'
						form = ATSSellerForm(data=request.POST)
						return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro, 'product_info': product_info,'image_formset':image_formset,'message':message,'canonical':url, 'product_images':product_images,'roadmap':roadmap})
					elif str(parsed_number.national_number)[0] not in ['9', '8', '7', '6']:
						message = 'Invalid Phone Number: Must start with 9, 8, 7, or 6'
						form = ATSSellerForm(data=request.POST)
						return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro, 'product_info': product_info,'image_formset':image_formset,'message':message,'canonical':url,'product_images':product_images,'roadmap':roadmap})
					elif not phonenumbers.is_valid_number(parsed_number):
						message = 'Invalid Phone Number: must be of 10 digit'
						form = ATSSellerForm(data=request.POST)
						return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro, 'product_info': product_info,'image_formset':image_formset,'message':message,'canonical':url,'product_images':product_images,'roadmap':roadmap})
				except phonenumbers.phonenumberutil.NumberParseException:
					message = 'Invalid Phone number'
					form = ATSSellerForm(data=request.POST)
					return render(request, 'ats.html',{'form': form, 'data': data, 'logo': logo, 'contact_info': contact_info, 'intro': intro, 'product_info': product_info,'image_formset':image_formset,'message':message,'canonical':url,'product_images':product_images,'roadmap':roadmap})
				main_instance = form.save()
				image_formset.instance = main_instance
				image_formset.save()
				instance = ATSSeller.objects.get(id=main_instance.id)
				subject = 'powertiller.in: Agritech Mart Seller Enquiry'
				message = f'Agritech Mart Seller Enquiry from powertiller.in. Customer Name: {instance.seller_name}, Phone number: {instance.seller_company} and Address: {instance.seller_address}'
				recipient_list = ['dr.prasannad@way2agribusiness.com']
				send_notification(subject, message, recipient_list)
				return redirect(reverse('appagri:atm-seller-success'))
		else:
			return HttpResponse('none has been submiitted')
	form = ATSSellerForm() 
	image_formset = ATSSellerProductImageFormSet()
	return render(request, 'atm-category-company.html', {'category_slug':category_slug,'company_slug':company_slug,'logo':logo,'roadmap':roadmap,'form':form,'image_formset':image_formset,'intro':intro,'data':data,'contact_info':contact_info,'product_info':product_info,'product_images':product_images,'canonical':url,'product_image_dict':product_image_dict})

#Agritech Mart Start To Scale up form Success Handling
def seller_enquiry_success_view	(request):
	url = request.build_absolute_uri(request.path)
	logo = Logo.objects.all()
	return render(request, 'ats_seller_enquiry_success.html', {'logo':logo, 'canonical':url})

#Agritech Mart Introduction ModelViewSet
class ATSIntroViewSet(viewsets.ModelViewSet):
	queryset = ATSIntro.objects.all()
	serializer_class = ATSIntroSerializer

#Agritech Mart Category Information ModelViewSet
class ATSInfoViewSet(viewsets.ModelViewSet):
	queryset = ATSInfo.objects.all()
	serializer_class = ATSSerializer

#Agritech Mart Company Information Modelviewset
class ATSContactInfoViewSet(viewsets.ModelViewSet):
	queryset = ATSContactInfo.objects.all()
	serializer_class = ATSContactSerializer

#Agritech Mart Company Product Information ModelViewSet
class ATSContactProductInfoViewSet(viewsets.ModelViewSet):
	queryset = ATSContactProductInfo.objects.all()
	serializer_class = ATSContactProductSerializer

#Agritech Mart Company Multiple Product Images Handling Modelviewset
class ATSContactProductImagesViewSet(viewsets.ModelViewSet):
	queryset = ATSContactProductImages.objects.all()
	serializer_class = ATSContactProductImagesSerializer
