var React = require('react');

var Tabs = React.createClass({

    displayName: 'Tabs',

    getInitialState: function() {
        return {
            tabActive: this.props.tabActive
        };
    },

    componentDidMount: function() {
        var index = this.state.tabActive;
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedMenu = this.refs['tab-menu-' + index];

        if (this.props.onMount) {
            this.props.onMount(index, $selectedPanel, $selectedMenu);
        }
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.tabActive) {
            this.setState({
                tabActive: newProps.tabActive
            });
        }
    },

    render: function() {
        return (
            <div className="tabs">
                {this._getMenuItems()}
            </div>
        );
    },

    _getMenuItems: function() {
        var $menuItems = this.props.children.map(function($panel, index) {
            var ref = 'tab-menu-' + (index + 1);
            var title = $panel.props.title;

            return (
                <li ref={ref} key={index}>
                    {title}
                </li>
            );
        });

        return (
            <nav className="tabs-navigation">
                <ul className="tabs-menu">{$menuItems}</ul>
            </nav>
        );
    }

});

Tabs.Panel = React.createClass({
    render: function() {
        return <div>{this.props.children}</div>;
    }
});

module.exports = Tabs;
