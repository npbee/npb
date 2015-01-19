var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var undoCbs = [];
var doCbs = [];

var AppStore = assign({}, EventEmitter.prototype, {

    undoCbs: function() {
        return undoCbs;
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
        undoCbs = [];
        doCbs = [];
        AppStore.emitChange();
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case 'NAVIGATE':
            AppStore.emitChange();
            break;
        case 'UNDO':
            undoCbs.push(function() {
                action.undoCb();
            });

            doCbs.push(action.doCb);

            AppStore.emitChange();

            if (undoCbs.length) {
                setTimeout(function() {
                    doCbs.forEach(function(cb) {
                        cb();
                    });
                    AppStore.resetUndo();
                }, AppConstants.UNDOTIME);
            }
            break;
        default:
            return true;
    }
});

module.exports = AppStore;
