var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    navigate: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.NAVIGATE
        });
    }
};

module.exports = AppActions;
