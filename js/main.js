document.addEventListener('DOMContentLoaded', () => {
    // Store menu container
    const mobileMenu = document.getElementById('mobile-menu');
    // Store Trigger
    const mobileBtn = document.getElementById('mobile-footer-btn');
    const rotation = document.querySelector('.mobile-btn-close');

    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (mobileMenu.classList.contains('mobile-menu-hide') || rotation.classList.contains('is-rotating')) {
            mobileMenu.classList.remove('mobile-menu-hide');
            mobileMenu.classList.add('mobile-menu-show');
            rotation.classList.remove('is-rotating');
            rotation.classList.add('is-rotating-back');
        } else {
            mobileMenu.classList.remove('mobile-menu-show');
            mobileMenu.classList.add('mobile-menu-hide');
            rotation.classList.remove('is-rotating-back');
            rotation.classList.add('is-rotating');
        }
    });
});
