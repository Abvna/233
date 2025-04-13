document.addEventListener("DOMContentLoaded", function () {
    // Fade-in анімація для елементів
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        element.classList.add('visible');
    });

    // Темний режим
    const themeToggle = document.getElementById('themeToggle');
    function setTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Світлий режим';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙 Темний режим';
            localStorage.setItem('theme', 'light');
        }
    }
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Анімовані кнопки з копіюванням
    document.querySelectorAll('.animated-button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.copy) {
                copyToClipboard(button.dataset.copy);
                button.textContent = 'Скопійовано!';
                setTimeout(() => {
                    button.textContent = button.dataset.text || 'Копіювати';
                }, 2000);
            }
        });

        button.addEventListener('mouseover', () => {
            button.classList.add('hovered');
        });

        button.addEventListener('mouseout', () => {
            button.classList.remove('hovered');
        });
    });

    // Функція копіювання в буфер обміну
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function () {
            showFlashMessage('Скопійовано: ' + text);
        }, function (err) {
            console.error('Помилка копіювання: ', err);
        });
    }

    // Flash-повідомлення
    function showFlashMessage(message) {
        const flashMessageDiv = document.getElementById('flash-message');
        flashMessageDiv.textContent = message;
        flashMessageDiv.classList.add('show');
        setTimeout(() => {
            flashMessageDiv.classList.remove('show');
        }, 3000);
    }

    // Автоматичне зникнення Django-повідомлень
    const djangoMessages = document.querySelectorAll('.alert');
    djangoMessages.forEach(function(message) {
        setTimeout(function() {
            message.classList.add('fade');
            setTimeout(function() {
                message.remove();
            }, 500);
        }, 3000);
    });

    // Анімація при прокрутці
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Кнопка "Назад до верху"
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавна прокрутка для внутрішніх посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});