from django import forms
from .models import Comments, Review, IntechFeedback, IntechSeller, IntechSellerProductImage, ATSSeller, ATSSellerProductImage, Contacts
import phonenumbers
from django.forms import inlineformset_factory
from django.utils.text import slugify

#Contact Us Form 
class ContactForm(forms.ModelForm):
		class Meta:
			model=Contacts
			fields = '__all__'
			exclude = ['date','is_seen']
			labels={
				"comments":"Message"
			}
			widgets = {
				'number':forms.NumberInput(attrs={'type':'number'})
			}

#Blogs Comment Form
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['name','comment']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your Name'}),
            'comment': forms.Textarea(attrs={'placeholder': 'Add Comment'}),
        }

#Product Review Form
class ReviewForm(forms.ModelForm):
	class Meta:
		model = Review
		fields = ['name','whatsapp_no','rating','review','r_image']
		widgets = {
        	'name': forms.TextInput(attrs={'placeholder': 'Enter your Full Name'}),
        	'whatsapp_no': forms.TextInput(attrs={'placeholder': "Enter Your 10-digit Whatsapp Number"}),
        	'review': forms.Textarea(attrs={'placeholder': 'Enter your Feedback about the product'}),
        }
		labels = {
        	'whatsapp_no':"Whatsapp Number",
        	'r_image':"Share your Product Experience (Photo: 2MB max)"
        }

	#IP Address of User Network of user 
	def getIP(self, request):
		x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
		if x_forwarded_for:
			ip = x_forwarded_for.split(',')[0]
		else:
			ip = request.META.get('REMOTE_ADDR')
		return ip
	
	#Constructor Overridng if existing user IP address then existing name and whatsapp number corresponding to the IP address will be set to teh corresponding field
	def __init__(self, request, *args, **kwargs):
		ip = self.getIP(request)
		super(ReviewForm, self).__init__(*args, **kwargs)
		existing_reviews = Review.objects.filter(ip_address=ip)
		if existing_reviews.exists():
			first_review = existing_reviews.first()
			self.fields['name'].initial = first_review.name
			self.fields['whatsapp_no'].initial = first_review.whatsapp_no
		self.fields['review'].required = False

#Global Agritech Product Feedback Form
class FeedbackForm(forms.ModelForm):
    class Meta:
        model = IntechFeedback
        fields = ['user_name','user_phone','user_rating','user_feedback']
        widgets = {
            'user_name': forms.TextInput(attrs={'placeholder': 'Enter your Full Name'}),
            'user_phone': forms.NumberInput(attrs={'placeholder': "Enter Your 10-digit Whatsapp No."}),
            'user_feedback': forms.Textarea(attrs={'placeholder': 'Enter your Feedback about the product'}),
        }

    def clean_user_phone(self):
        user_phone = self.cleaned_data['user_phone']
        if len(user_phone) != 10 or not user_phone.isdigit():
            raise forms.ValidationError("Please enter a valid 10-digit Whatsapp Number")
        return user_phone

#Start to Scale Up Form
class SellerForm(forms.ModelForm):
    class Meta:
        model = IntechSeller
        fields = '__all__'
        widgets = {
            'seller_name': forms.TextInput(attrs={'placeholder': 'Enter your Full Name'}),
            'seller_company': forms.TextInput(attrs={'placeholder': "Enter Your 10-digit Whatsapp No."}),
            'seller_email_id': forms.EmailInput(attrs={'placeholder': "Enter your valid Email ID"}),
            'seller_address':forms.Textarea(attrs={'placeholder': "Enter Your Address"}),
            'seller_plan':forms.Textarea(attrs={'placeholder': "Brief about the product planning to sell in India" }),
            'seller_feedback': forms.Textarea(attrs={'placeholder': 'Define the services you require from us targeting Indian market (preferably Karnataka) across the different stages of your journey (from start to scale-up, stages 1 to 5)'}),
        }
        labels = {
            'seller_product_avail_india':'Products currently available or not in Indian market? (Tick if Yes)',
        }

#Global Agritech - Start To Scale Up Form - Multiple Product Iamges by the Seller Handling by Formset
IntechSellerProductImageFormSet = inlineformset_factory(
    IntechSeller,
    IntechSellerProductImage,
    fields=['seller_product_images'],
    extra=10,
    can_delete=True,
)

class CustomPlaceholderTextInput(forms.TextInput):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.attrs['style'] = 'font-size: 13px;'

class CustomPlaceholderTextarea(forms.Textarea):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.attrs['style'] = 'font-size: 13px;'

#Agritech Mart Start to Scale Up Form
class ATSSellerForm(forms.ModelForm):
    class Meta:
        model = ATSSeller
        fields = '__all__'
        widgets = {
            'seller_name': CustomPlaceholderTextInput(attrs={'placeholder': 'Enter your Full Name'}),
            'seller_company': CustomPlaceholderTextInput(attrs={'placeholder': "Enter Your 10-digit Whatsapp No."}),
            'seller_email_id': CustomPlaceholderTextInput(attrs={'placeholder': "Enter your Email ID"}),
            'seller_address': CustomPlaceholderTextarea(attrs={'placeholder': "Enter Your Address"}),
            'seller_plan': CustomPlaceholderTextarea(attrs={'placeholder': "Brief about the product planning to sell" }),
        }
        labels = {
            'seller_product_avail':'Products currently available or not in the market? (Tick if yes)',
        }

#Agritech MArt - Start To Scale Up Form - Multiple Product Iamges by the Seller Handling by Formset
ATSSellerProductImageFormSet = inlineformset_factory(
    ATSSeller,
    ATSSellerProductImage,
    fields=['seller_product_images'],
    extra=10,
    can_delete=True,
)


