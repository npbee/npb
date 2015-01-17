var AppDispatcher = require('../dispatcher/AppDispatcher');
var NavConstants = require('../constants/NavConstants');

var NavActions = {
    toggle: function() {
        AppDispatcher.dispatch({
            actionType: NavConstants.TOGGLE_NAV
        });
    },
    close: function() {
        AppDispatcher.dispatch({
            actionType: NavConstants.CLOSE_NAV
        });
    }
}
module.exports = NavActions;
