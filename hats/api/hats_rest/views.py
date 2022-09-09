from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods

import json

# Create your views here.

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style", "fabric", "color"]

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["style", "fabric", "color", "picture_url", "location"]

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]



@require_http_methods(["GET","POST"])
def list_hats(request):
    
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        hat = Hat.objects.create(**content)

        

def show_hat():
    hat = Hat.objects.get(id=pk)
    return JsonResponse(
        {
            "style": hat.style,
            "fabric": hat.fabric,
            "color": hat.color,
            "picture": hat.picture_url,
            "location": hat.location,
        }
    )
