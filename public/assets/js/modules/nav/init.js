define(['modules/nav/events', 'modules/nav/sticky'], function(navEvents) {

    var nav = {

        init: function() {
            this.events();
        },

        events: function() {
            navEvents.init();
        }

    };

    return nav;

});