requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        hammer: 'libs/hammer',
        picturefill: 'libs/picturefill',
        fastclick: 'libs/fastclick',
        breakpoint: 'modules/utils/breakpoint',
        debounce: 'modules/utils/debounce',
        echo: 'libs/echo'
    }
});


/****
* Feature Testes
****/
require(['modules/featureTests']);

/****
* Flashes
****/
require(['modules/flash'], function(flash) {
  flash();
});


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


/***
 * DELETE METHOD
****/
require(['modules/utils/delete_method'], function(delete_method) {
  delete_method();
});

/****
* Analytics
****/
require(['modules/analytics']);



/****
* Admin only modules
****/
require(['modules/utils/is_admin'], function(is_admin) {
  if (is_admin()) {
    require(['modules/markdown_preview', ], function(markdown_preview) {
      markdown_preview();
    });
  }
});


