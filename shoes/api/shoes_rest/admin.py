from django.contrib import admin
from shoes_rest.models import BinVO, Shoes


# Register your models here.
@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Shoes)
class ShoeAdmin(admin.ModelAdmin):
    pass
