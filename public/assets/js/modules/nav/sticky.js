define(['debounce', 'breakpoint'], function(debounce, breakpoint) {

    var stickyNav = (function() {

        // No need to listen to scroll events or call this function
        // if we're on a small screen
        if ( !breakpoint.desk.matches ) {
            return;
        }

        var docElem = document.documentElement,
              nav = document.getElementById('nav-container'),
              changeOn = 300,
              lastScrollY = 0,
              tolerance = 75;

        function init() {

            debounce('scroll', checkScrollPosition, 200, true);

        }

        function checkScrollPosition() {

            var currentScrollY = scrollY();

            var toleranceExceeded = Math.abs(currentScrollY - lastScrollY) >= tolerance;

            if ( currentScrollY < 0 ) {
                return;
            }

            if ( currentScrollY < tolerance ) {
                resetNav();
            }

            if ( toleranceExceeded ) {

                if ( currentScrollY > 0 ) {
                    nav.classList.add('nav--scrolled');
                    setTimeout(function() {
                        nav.style.position = 'fixed';
                    }, 1000);
                }

                if ( currentScrollY < lastScrollY && currentScrollY > 0 ) {
                    stickNav();
                } else if ( currentScrollY > lastScrollY ) {
                    unstickNav();
                } else {
                    resetNav();
                }

            }

            lastScrollY = currentScrollY;

        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        function resetNav() {
            nav.classList.remove('nav--unstuck');
            nav.classList.remove('nav--stuck');
            nav.classList.remove('nav--scrolled');
            nav.style.position = 'absolute';
        }

        function stickNav() {
            nav.classList.remove('nav--unstuck');
            nav.classList.add('nav--stuck');
        }

        function unstickNav() {
            nav.classList.add('nav--unstuck');
            nav.classList.remove('nav--stuck');
        }

        init();


    })();

    return stickyNav;

});