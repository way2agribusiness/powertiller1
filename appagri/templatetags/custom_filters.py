from django import template

register = template.Library()

@register.filter
def get_from_dict(dictionary, key):
   return dictionary.get(key) 

@register.filter
def get_star_icons(rating):
    num_stars = int(rating)
    return range(num_stars)

@register.filter
def first_letter(name):
    return name[0]

@register.filter
def lower_str(str):
   return str.strip().lower()

@register.filter
def type_obj(obj):
   return type(obj)

@register.filter
def contains(obj,value):
	return obj.__contains__(value)
