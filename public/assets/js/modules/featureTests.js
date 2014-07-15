/****
* Test for features
****/

// First define Modernizr global so we can use it for feature tests
define('modernizr', [], Modernizr);



require(['modernizr', 'breakpoint'], function(Modernizr, breakpoint) {

    // Test for transforms
    if ( Modernizr.csstransforms3d ) {
        require(['modules/carousel'], function(carousel) {
            carousel();
        });
    }

    // Test for touch
    if ( Modernizr.touch ) {
        require(['fastclick'], function(FastClick) {
            FastClick.attach(document.body);
        });
    }

});