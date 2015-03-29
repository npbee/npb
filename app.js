var React = require('react');
var App = require('./components/App.react');
var _ = require('lodash');

var initialStateHTML = document.getElementById('initial-state').innerHTML;
var unescaped = _.unescape(initialStateHTML);
var initialState = JSON.parse(unescaped);

React.render(
    <App data={initialState} history="true" path={initialState.path} />,
    document.getElementById('react-container')
    );
