/****
 * LIBS
****/
var picturefill = require('./libs/picturefill');

/****
 * UTILS
****/
var features = require('./utils/features');

/****
 * SLAB TEXT
****/
var slabtext = require('./modules/slab-text').init();


/****
 * NAVIGATION 
****/
var nav = require('./modules/nav').init();


/****
 * CAROUSEL 
****/
var carousel = require('./modules/carousel');
if (features.csstransforms3d) {
  carousel();
}




/****
 * FASTCLICK 
****/
var attach_fastclick = require('./libs/fastclick');
if (features.touch) {
  attach_fastclick(document.body);
}



/****
 * LAZY LOADING IMAGES 
****/
var echo = require('./libs/echo');
echo.init({
  offset: 100,
  throttle: 250
});

