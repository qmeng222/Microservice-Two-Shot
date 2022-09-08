import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
from ..api.shoes_rest.models import BinVO

def get_bins():
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    content = json.loads(response.content)
    print("bins content:", content)
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href = bin["href"],
            defaults = {
            "closet_name": bin["closet_name"],
            "bin_number": bin["bin_number"],
            "bin_size": bin["bin_size"],
            },
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
