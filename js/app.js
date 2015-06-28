(function() {

    var navToggle = document.querySelectorAll('.main-nav__toggle')[0];
    var main = document.getElementsByTagName('main')[0];

    navToggle.addEventListener('click', function() {
        main.classList.toggle('main-nav--open');
    });

})();
