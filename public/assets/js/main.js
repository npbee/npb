requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        hammer: 'libs/hammer',
        picturefill: 'libs/picturefill',
        fastclick: 'libs/fastclick',
        breakpoint: 'modules/utils/breakpoint',
        debounce: 'modules/utils/debounce',
        echo: 'libs/echo'
    },
});



/****
* Feature Testes
****/
require(['modules/featureTests']);




/****
* Responsive Images
****/
require(['picturefill']);




/****
* Echo (lazy loading)
****/
require(['echo'], function(Echo) {
    Echo.init({
        offset: 100,
        throttle: 250
    });
});



/****
* Slab Text
****/
require(['modules/slabtext'], function(slabText) {
    slabText.init();
});




/****
* Navigation
****/
require(['modules/nav/init'], function(nav) {

    nav.init();

});



/****
* Contact Form
****/
// require(['modules/contact'], function(contact) {
//     contact.init();
// });


/****
* Analytics
****/
require(['modules/analytics']);
