var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var isUndoing = false;
var undoCb = null;
var doDb = null;

var AppStore = assign({}, EventEmitter.prototype, {

    isUndoing: function() {
        return isUndoing;
    },

    undoCb: function() {
        return undoCb;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(callback);
    },

    resetUndo: function() {
        isUndoing = false;
        undoCb = null;
        doCb = null;
        AppStore.emitChange();
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'NAVIGATE':
            AppStore.emitChange();
            break;
        case 'UNDO':
            isUndoing = true;
            undoCb = function() {
                action.undoCb();
                isUndoing = false;
                AppStore.resetUndo();
            };
            AppStore.emitChange();

            if (isUndoing) {
                setTimeout(function() {
                    action.doCb();
                    AppStore.resetUndo();
                }, AppConstants.UNDOTIME);
            }
            break;
        default:
            return true;
    }
});

module.exports = AppStore;
