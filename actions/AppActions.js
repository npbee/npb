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

    authenticate: function(isAuthenticated) {
        AppDispatcher.dispatch({
            actionType: AppConstants.AUTHENTICATE,
            isAuthenticated: isAuthenticated
        });
    }
};

module.exports = AppActions;
