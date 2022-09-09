from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoes,BinVO


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "import_href",
    ]


class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ["name"]



class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "name",
        "color",
        "picture_url",
        # "import_href",
        "bin"
    ]

    encoders = {"bin": BinVODetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoesListEncoder,
        )
    else:
        content = json.loads(request.body)
        if "bin" in content:
            try:
                bin_href = content["bin"]
                bin = BinVO.objects.get(import_href=bin_href)
                content["bin"] = bin

            except BinVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid bin id"},
                    status=400,
                )
    shoes = Shoes.objects.create(**content)
    return JsonResponse(
        shoes,
        encoder=ShoesDetailEncoder,
        safe=False,
    )



@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_shoes(request, pk):
    shoes = Shoes.objects.get(pk=pk)
    if request.method == "GET":
        return JsonResponse(
            shoes,
            encoder=ShoesDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Shoes.objects.filter(pk=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        if "bin" in content:
            try:
                bin = BinVO.objects.get(id=content["bin"])
                content["bin"] = bin
            except BinVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid bin id"},
                    status=400,
                )
