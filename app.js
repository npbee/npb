var React = require('react');
var App = require('./components/App.react');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(
    <App path='/' history='true' data={initialState} />,
    document.getElementsByTagName('body')[0]
    );
