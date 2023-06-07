# Generated by Django 4.2 on 2023-06-07 05:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Blog_meta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meta', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Blogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('hedding', models.CharField(max_length=255)),
                ('info', models.TextField()),
                ('discription', models.TextField()),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Blogs_key',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Brands',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('alt', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Compare_key',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Compare_meta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meta', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('number', models.DecimalField(decimal_places=2, max_digits=15)),
                ('subject', models.TextField()),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Contact_key',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Contact_meta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meta', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Highlights',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('text', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Home_Information',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imageone', models.ImageField(upload_to='images/')),
                ('imagetwo', models.ImageField(upload_to='images/')),
                ('imagethree', models.ImageField(upload_to='images/')),
                ('hedding', models.CharField(max_length=255)),
                ('information', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Home_key',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Home_meta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meta', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Home_Page_Links',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('external_link', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Homeimg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Homeproblem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main_hedding', models.CharField(max_length=255)),
                ('sub_hedding', models.CharField(max_length=255)),
                ('info', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Logo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=140)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('number', models.DecimalField(decimal_places=2, max_digits=15)),
                ('place', models.TextField()),
                ('subject', models.TextField()),
                ('image', models.ImageField(upload_to='images/')),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
                ('meta', models.CharField(max_length=500)),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='images/')),
                ('description', models.TextField()),
                ('pinfo', models.TextField()),
                ('Highlight_image1', models.ImageField(upload_to='images/')),
                ('text1', models.CharField(max_length=255)),
                ('Highlight_image2', models.ImageField(upload_to='images/')),
                ('text2', models.CharField(max_length=255)),
                ('Highlight_image3', models.ImageField(upload_to='images/')),
                ('text3', models.CharField(max_length=255)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product_Gallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gallery', models.FileField(upload_to='images/')),
                ('alt', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Product_Page_Links',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('external_link', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Videos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('embed_url', models.TextField()),
                ('hedding', models.CharField(max_length=255)),
                ('discription', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Videos_key',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Videos_meta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meta', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Webinfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('English_hedding', models.CharField(max_length=255)),
                ('English_text', models.TextField()),
                ('Kannada_hedding', models.CharField(max_length=255)),
                ('Kannada_text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='SubProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('spimage', models.ImageField(upload_to='images/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('spinfo', models.TextField()),
                ('ftype', models.CharField(max_length=255)),
                ('avilability', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('rateing', models.DecimalField(decimal_places=0, max_digits=10)),
                ('Key_1', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_1', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_2', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_2', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_3', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_3', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_4', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_4', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_5', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_5', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_6', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_6', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_7', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_7', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_8', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_8', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_9', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_9', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_10', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_10', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_11', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_11', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_12', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_12', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_13', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_13', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_14', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_14', models.CharField(blank=True, max_length=255, null=True)),
                ('Key_15', models.CharField(blank=True, max_length=255, null=True)),
                ('Value_15', models.CharField(blank=True, max_length=255, null=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appagri.product')),
            ],
        ),
        migrations.CreateModel(
            name='Product_External_links',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('external_link', models.CharField(max_length=500)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='external_links', to='appagri.product')),
            ],
        ),
    ]
