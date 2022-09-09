from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    # refere to wardrobe > api > wardrobe_api > models.py
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size =  models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=300, unique=True)

    def __str__(self):
        return f"{self.closet_name}"


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_shoes", kwargs={"pk": self.pk})
