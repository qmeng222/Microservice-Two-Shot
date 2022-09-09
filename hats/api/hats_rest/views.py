from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods

import json

# Create your views here.

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]

    def get_extra_data(self, o):
        return {"details": f"{o.closet_name} - section {o.section_number} - shelf {o.shelf_number}"}


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style", "fabric", "color", "id"]

    def get_extra_data(self, o):
        return {"location": o.location.id}

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["style", "fabric", "color", "picture_url", "location"]

    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET","POST"])
def list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            print("hi", location_vo_id)
            hats = Hat.objects.filter(location=location_vo_id)
        else:        
            hats = Hat.objects.all()
        
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )

    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location"},
                status = 400,
            )

        hat = Hat.objects.create(**content)

        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT","DELETE"])
def show_hat(request, pk):

    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Hat does not exist"}
            )
        
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    
    else:
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})



