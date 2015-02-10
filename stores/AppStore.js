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
        case 'AUTHENTICATE':
            AppStore.emitChange();
            break;
        case 'NAVIGATE':
            AppStore.emitChange();
            break;
        case 'UNDO':
            var currentLength = undoCbs.length;
            undoCbs.push(function() {
                action.undoCb();
                undoCbs[currentLength] = null;
                doCbs[currentLength] = null;
                AppStore.emitChange();
            });

            doCbs.push(action.doCb);

            AppStore.emitChange();

            if (undoCbs.length) {
                setTimeout(function() {
                    doCbs.forEach(function(cb) {
                        if (typeof cb === 'function') {
                            cb();
                        }
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
