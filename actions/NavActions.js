var AppDispatcher = require('../dispatcher/AppDispatcher');

var NavActions = {

  navigate: function(page) {
    AppDispatcher.handleViewAction({
      actionType: 'NAVIGATE',
      page: page
    });
  }

module.exports = NavActions;
