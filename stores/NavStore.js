var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

AppDispatcher.register(function(payload) {
  var action = payload.action;
   
  switch(action.actionType) {
    case 'NAVIGATE':
      console.log(action.page);
      break;
    default:
      return true;
  }
});
