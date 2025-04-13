from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.add_announcement, name='add_announcement'),
    path('delete/<int:ann_id>/', views.delete_announcement, name='delete_announcement'),
]