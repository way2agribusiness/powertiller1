from django.db import models
from django.utils.html import format_html

class Post(models.Model):
    text = models.CharField(max_length=140, blank=False, null=False)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text[0:20]

class Logo(models.Model):
    image =models.ImageField(upload_to='images/')
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name[0:20]

class Product(models.Model):
    key = models.TextField()
    meta = models.CharField(max_length=500)
    name = models.CharField(max_length=255)
    image =models.ImageField(upload_to='images/')
    description = models.TextField()
    pinfo = models.TextField()
    Highlight_image1 = models.ImageField(upload_to='images/')
    text1 = models.CharField(max_length=255)
    Highlight_image2 = models.ImageField(upload_to='images/')
    text2 = models.CharField(max_length=255)
    Highlight_image3 = models.ImageField(upload_to='images/')
    text3 = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name[0:20]  
    
class Product_Gallery(models.Model):
    gallery =models.FileField(upload_to='images/')
    alt = models.CharField(max_length=255)

    def __str__(self):
        return self.alt[0:20]
    
class Banner(models.Model):
    image = models.ImageField(upload_to='images/')

class SubProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    spimage =models.ImageField(upload_to='images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    spinfo = models.TextField()
    ftype = models.CharField(max_length=255)
    avilability = models.CharField(max_length=255)
    description = models.TextField()
    rateing = models.DecimalField(max_digits=10, decimal_places=0)
    # ///////////////dosage///////////
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
        if self.price > 0:
            return int(abs(100 - ((self.discount / self.price) * 100)))
        else:
            return 0

class Product_External_links(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='external_links')
    external_link = models.CharField(max_length=500)

class Product_Page_Links(models.Model):
    external_link = models.CharField(max_length=500)

class Home_Page_Links(models.Model):
    external_link = models.CharField(max_length=500)


class Highlights(models.Model):
    image = models.ImageField(upload_to='images/')
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text[0:20]
    
class Home_Information(models.Model):
    imageone = models.ImageField(upload_to='images/')
    imagetwo = models.ImageField(upload_to='images/')
    imagethree = models.ImageField(upload_to='images/')
    hedding = models.CharField(max_length=255)
    information = models.TextField()

    def __str__(self):
        return self.hedding[0:20]
    
class Webinfo(models.Model):
    image = models.ImageField(upload_to='images/')
    English_hedding = models.CharField(max_length=255)
    English_text = models.TextField()
    Kannada_hedding = models.CharField(max_length=255)
    Kannada_text = models.TextField()
    
    def __str__(self):
        return self.English_hedding[0:20]
    
class Blogs(models.Model):
    image = models.ImageField(upload_to='images/')
    hedding = models.CharField(max_length=255)
    info = models.TextField()
    discription = models.TextField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.hedding[0:20]
    
class Videos(models.Model):
    image = models.ImageField(upload_to='images/')
    embed_url = models.TextField()
    hedding = models.CharField(max_length=255)
    discription = models.TextField()

    def __str__(self):
        return self.hedding[0:20]
    
class Contact(models.Model):
    name = models.CharField(max_length=255)
    number = models.DecimalField(max_digits=15, decimal_places=2)
    subject = models.TextField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name[0:20]

class Brands(models.Model):
    image = models.ImageField(upload_to='images/')
    alt = models.CharField(max_length=255)

    def __str__(self):
        return self.alt[0:20]

class Problem(models.Model):
    name = models.CharField(max_length=255)
    number = models.DecimalField(max_digits=15, decimal_places=2)
    place = models.TextField()
    subject = models.TextField()
    image = models.ImageField(upload_to='images/')
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

    def image_tag(self):
        if self.image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />'.format(self.image.url))
        else:
            return ''

    image_tag.short_description = 'Image'

class Homeproblem(models.Model):
    main_hedding = models.CharField(max_length=255)
    sub_hedding = models.CharField(max_length=255)
    info = models.TextField()

    def __str__(self):
        return self.sub_hedding[0:20]

class Homeimg(models.Model):
    image = models.ImageField(upload_to='images/')


class Home_key(models.Model):
    key = models.TextField()

class Videos_key(models.Model):
    key = models.TextField()

class Blogs_key(models.Model):
    key = models.TextField()

class Contact_key(models.Model):
    key = models.TextField()

class Compare_key(models.Model):
    key = models.TextField()
# //////////////////meta/////////////////
class Home_meta(models.Model):
    meta = models.CharField(max_length=500)

class Videos_meta(models.Model):
    meta = models.CharField(max_length=500)

class Blog_meta(models.Model):
    meta = models.CharField(max_length=500)

class Contact_meta(models.Model):
    meta = models.CharField(max_length=500)

class Compare_meta(models.Model):
    meta = models.CharField(max_length=500)

