from django.db import models

# Create your models here.

# Location value object because location is pulled from Wardrobe models

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.closet_name


class Hat(models.Model):
    style = models.CharField(max_length=200)
    fabric = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=200, null=True)
    location = models.ForeignKey(LocationVO, related_name="hats", on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.color + " " + self.style