from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Announcement

def index(request):
    announcements = Announcement.objects.all().order_by('-created_at')
    return render(request, 'index.html', {'announcements': announcements})

def add_announcement(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        description = request.POST.get('description', '').strip()
        price = request.POST.get('price', '')

        if not title or len(title) > 100:
            messages.error(request, 'Заголовок має бути від 1 до 100 символів!')
            return redirect('index')
        if not description or len(description) > 500:
            messages.error(request, 'Опис має бути від 1 до 500 символів!')
            return redirect('index')
        if not price.isdigit() or int(price) < 0:
            messages.error(request, 'Ціна має бути невід’ємним числом!')
            return redirect('index')

        Announcement.objects.create(
            title=title,
            description=description,
            price=int(price)
        )
        messages.success(request, 'Оголошення успішно додано!')
        return redirect('index')
    return redirect('index')

def delete_announcement(request, ann_id):
    try:
        announcement = Announcement.objects.get(id=ann_id)
        announcement.delete()
        messages.success(request, 'Оголошення успішно видалено!')
    except Announcement.DoesNotExist:
        messages.error(request, 'Оголошення з таким ID не знайдено!')
    return redirect('index')