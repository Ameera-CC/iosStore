document.addEventListener('DOMContentLoaded', function () {
    const iphoneNav = document.querySelector('.iphone-nav');
    const subHover = document.querySelector('.sub-hover');
    const bannerArea = document.querySelector('.banner-area');
    const body = document.body;

    iphoneNav.addEventListener('mouseenter', function () {
        subHover.style.display = 'block';
        bannerArea.style.display = 'none';
        body.classList.add('no-scroll'); // Disable body scroll
    });

    iphoneNav.addEventListener('mouseleave', function () {
        // Use a timeout to check if the mouse enters the submenu
        setTimeout(function () {
            if (!subHover.matches(':hover')) {
                subHover.style.display = 'none';
                bannerArea.style.display = 'block';
                body.classList.remove('no-scroll'); // Enable body scroll
            }
        }, 100);
    });

    subHover.addEventListener('mouseleave', function () {
        subHover.style.display = 'none';
        bannerArea.style.display = 'block';
        body.classList.remove('no-scroll'); // Enable body scroll
    });

    subHover.addEventListener('mouseenter', function () {
        subHover.style.display = 'block';
        bannerArea.style.display = 'none';
        body.classList.add('no-scroll'); // Disable body scroll
    });
});

