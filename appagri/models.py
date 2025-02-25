from django.db import models
from django.utils.html import format_html
from django.db.models.signals import pre_save
from django.dispatch import receiver
from cloudinary.models import CloudinaryField
from django.utils.text import slugify

class Numberofvisits(models.Model):
	city=models.CharField(max_length=20,null=True)
	district=models.CharField(max_length=20,null=True)
	region=models.CharField(max_length=20,null=True)
	Time=models.DateTimeField(auto_now_add=True,null=True)

	def __str__(self) -> str:
		return self.city 
	
	class Meta:
		verbose_name ='Number of visits'
		verbose_name_plural ='Number of visits'


	def save(self, *args, **kwargs):
        # Ensure city is set to "Unknown" if not provided
		if not self.city:
			self.city = "Unknown"
		if not self.district:
			self.district = "Unknown"
		if not self.region:
			self.region ="Unknown"
		super().save(*args, **kwargs)
#Contact Number of Users Model
class ContactNumber(models.Model):
	phone_number=models.CharField(max_length=12)
	Time= models.DateTimeField(null=True)
	is_seen=models.BooleanField(null=True)
	city = models.CharField(max_length=100, null=True, blank=True)
	remarks = models.CharField(max_length=500,null=True, blank=True)
	district=models.CharField(max_length=20,null=True,blank=True)
	stateDistrict=models.CharField(max_length=20,null=True,blank=True)
	county=models.CharField(max_length=20,null=True,blank=True)
	region=models.CharField(max_length=20,null=True,blank=True)

	def __str__(self):
		return self.phone_number

	class Meta:
		verbose_name='Contact Number'
		verbose_name_plural='Contact Number'

#Website Logo Model
class Logo(models.Model):
	image = CloudinaryField()
	name = models.CharField(max_length=255)

	def __str__(self):
		return self.name

	class Meta:
		verbose_name='Upload Website Logo'
		verbose_name_plural ='Upload Website Logo'


# Product Category Model
class Product(models.Model):
	CHOICES = (('Farm Machinaries','Farm Machinaries'),('Implements & Others','Implements & Others'),('Irrigation Systems', 'Irrigation Systems'))
	category = models.CharField(max_length=200,null=True,choices=CHOICES,blank=True)
	order_no = models.IntegerField(null=True,blank=True)
	meta_title = models.CharField(max_length=500,null=True,blank=True)
	meta_description = models.TextField(null=True, blank=True)
	keywords = models.TextField(null=True, blank=True)
	backlinks = models.TextField(null=True, blank=True)
	name = models.CharField(max_length=255,blank=True)
	slug = models.SlugField(unique=True, blank=True, null=True)
	image = CloudinaryField(blank=True)
	alt = models.CharField(max_length=500, default='', blank=True)
	pinfo = models.TextField(blank=True)
	Highlight_image1 = CloudinaryField(blank=True)
	text1 = models.CharField(max_length=255, blank=True)
	Highlight_image2 = CloudinaryField(blank=True)
	text2 = models.CharField(max_length=255, blank=True)
	Highlight_image3 = CloudinaryField(blank=True)
	text3 = models.CharField(max_length=255,blank=True)
	date = models.DateTimeField(auto_now=True, blank=True)
	background_gif = models.CharField(max_length=2000, default='', null=True, blank=True)
	exclusive_img = CloudinaryField(default='',null=True,blank=True)
	exclusive_img_alt = models.CharField(max_length=500, null=True,blank=True)
	exclusive_highlight_text = models.CharField(max_length=500, default='',null=True,blank=True)

	class Meta:
		ordering = ['order_no']
		verbose_name = 'Enter Product Categories Data'
		verbose_name_plural = 'Enter Product Categories Data'

	def __str__(self):
		return self.name;

# Website Banner Model
class Banner(models.Model):
	image = CloudinaryField()
	alt = models.CharField(max_length=500, default='')
	link = models.CharField(max_length=500, default='')

	class Meta:
		verbose_name = 'Upload Banner Images'
		verbose_name_plural = 'Upload Banner Images'

#Product Model
class SubProduct(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	name = models.CharField(max_length=255)
	slug = models.SlugField(unique=True, blank=True, null=True)
	spimage = CloudinaryField()
	sales_price = models.DecimalField(max_digits=10, decimal_places=2)
	mrp = models.DecimalField(max_digits=10, decimal_places=2)
	spinfo = models.TextField()
	quantity = models.CharField(max_length=255,null=True)
	description = models.TextField()
	rateing = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)
	order_no = models.IntegerField(null=True,blank=True)
	Key_1 = models.CharField(max_length=255, null=True, blank=True)
	Value_1 = models.CharField(max_length=255, null=True, blank=True)
	Key_2 = models.CharField(max_length=255, null=True, blank=True)
	Value_2 = models.CharField(max_length=255, null=True, blank=True)
	Key_3 = models.CharField(max_length=255, null=True, blank=True)
	Value_3 = models.CharField(max_length=255, null=True, blank=True)
	Key_4 = models.CharField(max_length=255, null=True, blank=True)
	Value_4 = models.CharField(max_length=255, null=True, blank=True)
	Key_5 = models.CharField(max_length=255, null=True, blank=True)
	Value_5 = models.CharField(max_length=255, null=True, blank=True)
	Key_6 = models.CharField(max_length=255, null=True, blank=True)
	Value_6 = models.CharField(max_length=255, null=True, blank=True)
	Key_7 = models.CharField(max_length=255, null=True, blank=True)
	Value_7 = models.CharField(max_length=255, null=True, blank=True)
	Key_8 = models.CharField(max_length=255, null=True, blank=True)
	Value_8 = models.CharField(max_length=255, null=True, blank=True)
	Key_9 = models.CharField(max_length=255, null=True, blank=True)
	Value_9 = models.CharField(max_length=255, null=True, blank=True)
	Key_10 = models.CharField(max_length=255, null=True, blank=True)
	Value_10 = models.CharField(max_length=255, null=True, blank=True)
	Key_11 = models.CharField(max_length=255, null=True, blank=True)
	Value_11 = models.CharField(max_length=255, null=True, blank=True)
	Key_12 = models.CharField(max_length=255, null=True, blank=True)
	Value_12 = models.CharField(max_length=255, null=True, blank=True)
	Key_13 = models.CharField(max_length=255, null=True, blank=True)
	Value_13 = models.CharField(max_length=255, null=True, blank=True)
	Key_14 = models.CharField(max_length=255, null=True, blank=True)
	Value_14 = models.CharField(max_length=255, null=True, blank=True)
	Key_15 = models.CharField(max_length=255, null=True, blank=True)
	Value_15 = models.CharField(max_length=255, null=True, blank=True)

	def total(self):
		if self.sales_price > 0:
			return int(abs(100 - ((self.mrp / self.sales_price) * 100)))
		else:
			return 0

	def __str__(self):
		return self.name

	class Meta:
		ordering = ['order_no']
		verbose_name = 'Enter Products Data'
		verbose_name_plural = 'Enter Products Data' 

#Website Highlights and Cross Promotion Model
class Highlights(models.Model):
	image = CloudinaryField()
	alt = models.CharField(max_length = 500, default='')
	link = models.CharField(max_length=255, blank=True, null=True)
	text1 = models.CharField(max_length=255, blank=True, null=True)

	def __str__(self):
		return self.alt

	class Meta:
		verbose_name = 'Enter Cross Promotion Content'
		verbose_name_plural = 'Enter Cross Promotion Content'
class MyModel(models.Model):
    name = models.CharField(max_length=100, db_index=True)  # Add index for faster queries

  
#Website Introduction Model
class Home_Information(models.Model):
	imageone = CloudinaryField()
	imagetwo = CloudinaryField()
	imagethree = CloudinaryField()
	hedding = models.CharField(max_length=255)
	information = models.TextField()
	Kannada_text = models.TextField(default="")

	def __str__(self):
		return self.hedding

	class Meta:
		verbose_name = 'Enter Website Introduction'
		verbose_name_plural = 'Enter Website Introduction'

#Blogs Model
class Blogs(models.Model):
	image = CloudinaryField()
	blog_heading = models.CharField(max_length=255,default='')
	blog_description = models.TextField(default='')
	date = models.DateTimeField(auto_now=True)
	embed_url = models.TextField(default='')
	video_heading = models.CharField(max_length=255,default='')
	video_description = models.TextField(default='')

	def __str__(self):
		return self.blog_heading

	class Meta:
		verbose_name = 'Post Blogs'
		verbose_name_plural = 'Post Blogs'

#Blogs Comment Model
class Comments(models.Model):
	video = models.ForeignKey(Blogs, on_delete=models.CASCADE, related_name='comments',null=True)
	name = models.CharField(max_length=255,null=True)
	comment = models.CharField(max_length=500,null=True)
	date = models.DateField(auto_now=True)

	def __str__(self):
		return self.comment

	class Meta:
		verbose_name = 'Get Blogs Comments'
		verbose_name_plural = 'Get Blogs Comments'

#Contact us Model
class Contacts(models.Model):
	name = models.CharField(max_length=255)
	number = models.CharField(max_length=10,null=True)
	place=models.CharField(max_length=500,default='')
	comments = models.TextField(null=True)
	date = models.DateTimeField(auto_now=True)
	is_seen=models.BooleanField(null=True)

	def __str__(self):
		return self.name

	class Meta:
		verbose_name = 'Get User Messages'
		verbose_name_plural = 'Get User Messages'

#Collbaration Section Model
class Brands(models.Model):
	image = CloudinaryField()
	alt = models.CharField(max_length=255)

	class Meta:
		verbose_name = 'Home & About Us: Upload Collaboration Images'
		verbose_name_plural = 'Home & About Us: Upload Collaboration Images'

#SEO Content For Web pages Model
class SeoPageExtLinks(models.Model):
	PAGES = (('home','Home'),
             ('aboutus','About Us'),
             ('contactus','Contact Us'),
             ('video blogs','Video Blogs'),
             ('gloabl-agritech','Global Agritech'),
             ('kcenter','K Center'),
             ('agritech-mart','Agritech Mart'),)
	page = models.CharField(max_length=50, choices=PAGES)
	meta_title = models.CharField(max_length=255, null=True, blank=True)
	meta_description = models.TextField(null=True, blank=True)
	keywords = models.TextField(null=True, blank=True)
	backlinks = models.TextField(null=True, blank=True)

	def __str__(self):
		return self.page

	class Meta:
		verbose_name = 'Enter SEO Content Page Wise'
		verbose_name_plural = 'Enter SEO Content Page Wise'

#SEO content for Each PRoduct Model
class Subproduct_External_links(models.Model):
	subproduct = models.ForeignKey(SubProduct,on_delete=models.CASCADE,related_name='subproduct_external_links')
	meta_title = models.CharField(max_length=100, null=True, blank=True)
	meta_desc = models.TextField(null=True, blank=True)
	keywords = models.TextField(null=True, blank=True)
	external_links = models.TextField(null=True, blank=True)

	class Meta:
		verbose_name = 'Enter Products SEO Contents'
		verbose_name_plural = 'Enter Products SEO Contents'

#Credentials section Model
class Credentials(models.Model):
	CATEGORY = (('awards','Awards'),
                ('media coverages','Media Coverages'),
                ('approvals and licenses','Approvals and Licenses'))

	image = CloudinaryField()
	title = models.CharField(max_length=255,null=True)
	type_of_image = models.CharField(max_length=255,choices=CATEGORY,null=True)

	class Meta:
		verbose_name = 'Upload Credential Images'
		verbose_name_plural = 'Upload Credential Images'

#KCenter Model
class kcentertopic(models.Model):
	ktopic = models.CharField(max_length=200)
	ktopic_slug = models.SlugField(unique=True, blank=True, null=True)
	ktopicimg = CloudinaryField()
	ktopicintro = models.TextField(default='')
	text1 = models.CharField(max_length=1000,null=True,blank=True)
	text2 = models.CharField(max_length=1000,null=True,blank=True)
	text3 = models.CharField(max_length=1000,null=True,blank=True)
	text4 = models.CharField(max_length=1000,null=True,blank=True)
	text5 = models.CharField(max_length=1000,null=True,blank=True)
	text6 = models.CharField(max_length=1000,null=True,blank=True)
	text7 = models.CharField(max_length=1000,null=True,blank=True)
	text8 = models.CharField(max_length=1000,null=True,blank=True)
	ktopicconclusion = models.CharField(max_length=1000)

	def __str__(self):
		return f'{self.ktopic}'

	class Meta:
		verbose_name = 'Enter KCenter Category-Specific Topic'
		verbose_name_plural = 'Enter KCenter Category-Specific Topic'

#PRoduct Review Model
class Review(models.Model):
	RATING_CHOICES = [
        (5, '★★★★★'),
        (4, '★★★★'),
        (3, '★★★'),
        (2, '★★'),
        (1, '★'), 
	]
	name = models.CharField(max_length=500)
	whatsapp_no = models.CharField(max_length=10, default='')
	rating = models.IntegerField(choices=RATING_CHOICES)
	review = models.TextField(null=True, blank=True)
	r_image = CloudinaryField(blank=True, default='')
	product = models.CharField(max_length=500)
	is_approved = models.BooleanField(default=False)
	review_token =  models.CharField(editable=False, unique=True, max_length=10, default='')
	ip_address = models.CharField(max_length=500, default='')
	is_important = models.BooleanField(default=False)
	date=models.DateField(null=True, blank=True)
	
	def __str__(self):
		return "{} - {} - {}".format(self.name, self.product, self.review)

	class Meta:
		verbose_name = "Get User's Product Reviews"
		verbose_name_plural = "Get User's Product Reviews"

#Review Response By Admin Model
class ReviewResponse(models.Model):
	review = models.ForeignKey(Review, on_delete = models.CASCADE)
	response_text = models.TextField()

	def __str__(self):
		return self.review.review_token

	class Meta:
		verbose_name = "Admin Response to User's Reviews"
		verbose_name_plural = "Admin Response to User's Reviews"

#Global Agritech Introduction section model
class IntechIntro(models.Model):
	title = models.CharField(max_length=500)
	intro_text = models.TextField(max_length=2000)

	class Meta:
		verbose_name = 'Enter Global Agritech Introduction'
		verbose_name_plural = 'Enter Global Agritech Introduction'




class IntechCountry(models.Model):
    country = models.CharField(max_length=255, null=True, blank=True)
    country_slug = models.SlugField(unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.country_slug:
            self.country_slug = slugify(self.country)
        super(IntechCountry, self).save(*args, **kwargs)

    def __str__(self):
        return self.country

    class Meta:
        verbose_name = 'Enter Global Agritech Country Data'
        verbose_name_plural = 'Enter Global Agritech Country Data'


#Global Agritech Category Data for each Country Model
class IntechCategoryDetails(models.Model):
	country = models.ForeignKey(IntechCountry, on_delete=models.CASCADE)
	category_title = models.CharField(max_length=500)
	category_intro = models.TextField()

	def __str__(self):
		return f'{self.category_title} - {self.country.country}'
	
	class Meta:
		verbose_name = 'Enter Global Agritech Category'
		verbose_name_plural = 'Enter Global Agritech Category'

#Agritech Mart Category Info Model
class ATSInfo(models.Model):
	TYPES = (('Agri Clinic','Agri Clinic'),
		  	('Agritech','Agritech'))
	category_name = models.CharField(max_length=500)
	category_slug = models.SlugField(unique=True, blank=True, null=True)
	category_image = CloudinaryField(blank=True, null=True)
	category_text = models.TextField(blank=True, null=True)
	product_category = models.CharField(max_length=500,choices=TYPES,null=True, blank=True)

	def __str__(self):
		return self.category_name
	
	class Meta:
		verbose_name = 'Global Agritech & ATM: Enter Category Info'
		verbose_name_plural = 'Global Agritech & ATM: Enter Category Info'

#Global Agritech PRoduct Model for each Category of country


class IntechProduct(models.Model):
    @staticmethod
    def get_classes():
        # Static categories to be used for the product_class field dropdown
        GROUPS = [
            ('seeds_plants', 'Seeds & Plants'),
            ('irrigation_fertilizers', 'Irrigation & Fertilizers'),
            ('fertilizers_organic_bio_products', 'Fertilizers - Organic & Bio Products'),
            ('fertilizers_inorganic', 'Fertilizers - Inorganic'),
            ('pesticide_organic_inorganic', 'Pesticide Organic and Inorganic'),
            ('farm_machinery_agri_services', 'Farm Machinery and Agri Services'),
        ]
        return GROUPS

    category = models.ForeignKey(IntechCategoryDetails, on_delete=models.CASCADE)
    
    # Set choices dynamically using the fixed get_classes method
    product_class = models.CharField(
        max_length=500, 
        null=True, 
        blank=True, 
        choices=get_classes()  # Use static category choices
    )
    
    seller_name = models.CharField(max_length=500)
    seller_details = models.TextField(blank=True)
    product_name = models.CharField(max_length=500, null=True, blank=True)
    product_slug = models.SlugField(unique=True, blank=True, null=True)
    product_image = CloudinaryField()
    alt = models.CharField(max_length=500, default='', blank=True)
    product_text = models.TextField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return f'{self.product_name} - {self.category.category_title}'

    class Meta:
        verbose_name = 'Enter Global Agritech Product'
        verbose_name_plural = 'Enter Global Agritech Product'


#Global Agritech Feedback of PRoduct Model
class IntechFeedback(models.Model):
	RATING_CHOICES = [
        (5, '★★★★★'),
        (4, '★★★★'),
        (3, '★★★'),
        (2, '★★'),
        (1, '★'), 
    ]
	product = models.CharField(max_length=500)
	user_name = models.CharField(max_length=500)
	user_phone = models.CharField(max_length=10)
	user_rating = models.IntegerField(choices=RATING_CHOICES)
	user_feedback = models.TextField()

	class Meta:
		verbose_name = 'Get Global Agritech Product Feedback'
		verbose_name_plural = 'Get Global Agritech Product Feedback'

#To store the average rating of each product of global agritech
class GlobalAgritechProductAvgRating(models.Model):
	product = models.CharField(max_length=500)
	avg_rating = models.FloatField()

#Global Agritech Roadmap Ppt Models
class IntechRoadmap(models.Model):
	roadmap_title = models.CharField(max_length=500)
	ppt = CloudinaryField()
	alt = models.CharField(max_length=500, default='')

	class Meta:
		verbose_name = 'Global Agritech & ATM: Enter Roadmap Details'
		verbose_name_plural = 'Global Agritech & ATM: Enter Roadmap Details'

#Global Agritech Seller Form Models
class IntechSeller(models.Model):
	seller_name = models.CharField(max_length=500)
	seller_company = models.CharField(max_length=500)
	seller_address = models.TextField()
	seller_email_id = models.EmailField()
	seller_product_avail_india = models.BooleanField()
	seller_plan = models.TextField()
	seller_feedback = models.TextField()

	class Meta:
		verbose_name = 'Get Global Agritech Seller Enquiry & Feedback'
		verbose_name_plural = 'Get Global Agritech Seller Enquiry & Feedback'

#Global Agritech Seller Product Images 
class IntechSellerProductImage(models.Model):
	seller = models.ForeignKey(IntechSeller, on_delete=models.CASCADE, default='')
	seller_product_images = CloudinaryField()

#Agritech Mart Introduction Model
class ATSIntro(models.Model):
	title = models.CharField(max_length=500)
	description = models.TextField()

	class Meta:
		verbose_name = 'Enter ATM Introduction'
		verbose_name_plural = 'Enter ATM Introduction'

#Agritech Mart Seller Company Data Model
class ATSContactInfo(models.Model):
	category = models.ForeignKey(ATSInfo, on_delete=models.CASCADE)
	contact_name = models.CharField(max_length=500)
	contact_phone = models.CharField(max_length=10)
	contact_email = models.EmailField()
	contact_company_name = models.CharField(max_length=500)
	contact_company_desc = models.TextField(default='')
	contact_company_logo = CloudinaryField(default='')
	contact_company_link = models.CharField(max_length=500, default='')

	def __str__(self):
		return f'{self.contact_name} - {self.category.category_name}'
	
	class Meta:
		verbose_name = 'Enter ATM Supplier Info'
		verbose_name_plural = 'Enter ATM Supplier Info'

#Agritech Mart Seller Product Information Model
class ATSContactProductInfo(models.Model):
	seller = models.ForeignKey(ATSContactInfo, on_delete=models.CASCADE)
	product_name = models.CharField(max_length=500, null=True, blank=True)
	product_desc = models.TextField(null=True, blank=True)
	product_price = models.FloatField(null=True, blank=True)

	def __str__(self):
		return f'{self.seller.category.category_name} - {self.seller.contact_company_name} - {self.product_name}'

	class Meta:
		verbose_name = 'Enter ATM Supplier Product Info'
		verbose_name_plural = 'Enter ATM Supplier Product Info'

#Agritech Mart company Product Images 
class ATSContactProductImages(models.Model):
	seller = models.ForeignKey(ATSContactInfo, on_delete=models.CASCADE, default='')
	seller_product = models.ForeignKey(ATSContactProductInfo, on_delete=models.CASCADE)
	product_image = CloudinaryField(default='')

	def __str__(self):
		return f'{self.seller.contact_company_name} - {self.seller_product.product_name}'

	class Meta:
		verbose_name = 'Enter ATM Supplier Product images'
		verbose_name_plural = 'Enter ATM Supplier Product images'

#Agritech MArt Enquired Seller Info
class ATSSeller(models.Model):
	seller_name = models.CharField(max_length=500)
	seller_company = models.CharField(max_length=500)
	seller_address = models.TextField()
	seller_email_id = models.EmailField()
	seller_product_avail = models.BooleanField(default=False)
	seller_plan = models.TextField()

	class Meta:
		verbose_name = 'Get ATM Seller Enquiry & Feedback'
		verbose_name_plural = 'Get ATM Seller Enquiry & Feedback'

#Agritech Mart Enquired Seller Product Images
class ATSSellerProductImage(models.Model):
	seller = models.ForeignKey(ATSSeller, on_delete=models.CASCADE)
	seller_product_images = CloudinaryField()

#Featured Listing in Home Page
class FeaturedListing(models.Model):
	featured_img = CloudinaryField()
	featured_alt = models.CharField(max_length=500)
	
	class Meta:
		verbose_name = 'Upload Featured Listing Images'
		verbose_name_plural = 'Upload Featured Listing Images'

#Dont delete this model, otherwise migrations issue will come, this is irrelavnt models, but dont dont delete , please dont consider.
class DripIrrigation(models.Model):
    title = models.CharField(max_length=500, null=True)
    image = CloudinaryField(null=True, blank=True)
    text1 = models.CharField(max_length=1000, null=True, blank=True)
    text2 = models.CharField(max_length=1000, null=True, blank=True)
    text3 = models.CharField(max_length=1000, null=True, blank=True)
    text4 = models.CharField(max_length=1000, null=True, blank=True)
    text5 = models.CharField(max_length=1000, null=True, blank=True)
    text6 = models.CharField(max_length=1000, null=True, blank=True)
    text7 = models.CharField(max_length=1000, null=True, blank=True)
    text8 = models.CharField(max_length=1000, null=True, blank=True)
    text9 = models.CharField(max_length=1000, null=True, blank=True)
    text10 = models.CharField(max_length=1000, null=True, blank=True)
    
    def __str__(self):
        return self.title

class HondaSpares(models.Model):
    title = models.CharField(max_length=500, null=True)
    image = CloudinaryField(null=True, blank=True)
    text1 = models.CharField(max_length=1000, null=True, blank=True)
    text2 = models.CharField(max_length=1000, null=True, blank=True)
    text3 = models.CharField(max_length=1000, null=True, blank=True)
    text4 = models.CharField(max_length=1000, null=True, blank=True)
    text5 = models.CharField(max_length=1000, null=True, blank=True)
    text6 = models.CharField(max_length=1000, null=True, blank=True)
    text7 = models.CharField(max_length=1000, null=True, blank=True)
    text8 = models.CharField(max_length=1000, null=True, blank=True)
    text9 = models.CharField(max_length=1000, null=True, blank=True)
    text10 = models.CharField(max_length=1000, null=True, blank=True)
    
    def __str__(self):
        return self.title


class KCenter(models.Model):
	title = models.CharField(max_length=500, null=True)
	image = CloudinaryField(null=True, blank=True)
	text1 = models.CharField(max_length=1000, null=True, blank=True)
	text2 = models.CharField(max_length=1000, null=True, blank=True)
	text3 = models.CharField(max_length=1000, null=True, blank=True)
	text4 = models.CharField(max_length=1000, null=True, blank=True)
	text5 = models.CharField(max_length=1000, null=True, blank=True)
	text6 = models.CharField(max_length=1000, null=True, blank=True)
	text7 = models.CharField(max_length=1000, null=True, blank=True)
	text8 = models.CharField(max_length=1000, null=True, blank=True)
	text9 = models.CharField(max_length=1000, null=True, blank=True)
	text10 = models.CharField(max_length=1000, null=True, blank=True)

	def __str__(self):
		return self.title
	class Meta:
		verbose_name = 'Enter K Center Data'
		verbose_name_plural = 'Enter K Center Data'

