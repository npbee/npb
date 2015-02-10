var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    navigate: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.NAVIGATE
        });
    },

    undo: function(undoCb, doCb) {
        AppDispatcher.dispatch({
            actionType: AppConstants.UNDO,
            undoCb: undoCb,
            doCb: doCb
        });
    },

    authenticate: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.AUTHENTICATE
        });
    }
};

module.exports = AppActions;
