from django.urls import path
from .views import api_list_shoes, api_show_shoes


urlpatterns = [
    # list shoes in a bin ("GET"):
    path(
        'bins/<int:bin_vo_id>/shoes/',
        api_list_shoes,
        name='api_list_shoes',
    ),

    # create shoe ("POST"):
    path(
        'shoes/',
        api_list_shoes,
        name='api_create_shoes'
    ),

    # show shoe ("GET"):
    path(
        'shoes/<int:pk>/',
        api_show_shoes,
        name='api_show_shoes'
    ),
]
