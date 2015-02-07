var React = require('react');

var Tabs = React.createClass({

    displayName: 'Tabs',

    getDefaultProps: function() {
        return {
            tabActive: 1
        };
    },

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
        //if (newProps.tabActive) {
            //this.setState({
                //tabActive: newProps.tabActive
            //});
        //}
    },

    render: function() {
        return (
            <div className="tabs">
                {this._getMenuItems()}
                {this._getSelectedPanel()}
            </div>
        );
    },

    setActive: function(index, e) {
        var onAfterChange = this.props.onAfterChange;
        var onBeforeChange = this.props.onBeforeChange;
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedTabMenu = this.refs['tab-menu' + index];

        if (onBeforeChange) {
            onBeforeChange(index, $selectedPanel, $selectedTabMenu);
        }

        this.setState({ tabActive: index }, function() {
            if (onAfterChange) {
                onAfterChange(index, selectedPanel, $selectedTabMenu);
            }
        });

        e.preventDefault();
    },

    _getMenuItems: function() {
        var self = this;
        var $menuItems = this.props.children.map(function($panel, index) {
            var ref = 'tab-menu-' + (index + 1);
            var title = $panel.props.title;
            var cls = 'tabs-menu-item';
            if (self.state.tabActive === (index + 1)) {
                cls = 'tabs-menu-item tabs-menu-item--active';
            }


            return (
                <a href='#' 
                    onClick={self.setActive.bind(self, index+1)}
                    ref={ref}
                    key={index}
                    className={cls}>
                    {title}
                </a>
            );
        });

        return (
            <nav className="tabs-navigation">
                {$menuItems}
            </nav>
        );
    },

    _getSelectedPanel: function() {
        var index = this.state.tabActive - 1;
        var $panel = this.props.children[index];

        return (
            <article ref="tab-panel" className="tab-panel">
                {$panel}
            </article>
        );
    }

});

Tabs.Panel = React.createClass({
    render: function() {
        return <div>{this.props.children}</div>;
    }
});

module.exports = Tabs;
