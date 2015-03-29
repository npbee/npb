var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NavConstants = require('../constants/NavConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var isOpen = false;
var isClosed;

var NavStore = assign({}, EventEmitter.prototype, {

    isOpen: function() {
        return isOpen;
    },

    isClosed: function() {
        return isClosed;
    },
    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'TOGGLE_NAV':
            isOpen = !isOpen;
            if (isClosed === undefined) {
                isClosed = false;
            } else {
                isClosed = !isClosed;
            }
            NavStore.emitChange();
            break;
        case 'CLOSE_NAV':
            isOpen = false;
            isClosed = true;
            NavStore.emitChange();
            break;
        default:
            return true;
    }
});

module.exports = NavStore;
