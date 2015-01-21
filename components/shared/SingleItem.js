/**********
 * SINGLE ITEM
 *
 * This component is for blog posts, project posts, etc.  Anything that needs
 * to be displayed with the side bar and long text body
 **********/
var React = require('react');
var SlabText = require('./SlabText');
var slab = require('../../lib/vanilla_slab');

module.exports = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        setTimeout(function() {
            slab.init();
        }, 100);
    },

    render: function() {
        var metaOne = this.props.metaOne.map(function(item) {
            return <li key={item.value}>
                <h2 className="meta__header">{item.title}</h2>
                <p className="meta__value">{item.value}</p>
            </li>
        });

        var metaTwo = this.props.metaTwo.map(function(item) {
            return <li key={item.value}>
                <h2 className="meta__header">{item.title}</h2>
                <p className="meta__value">{item.value}</p>
            </li>
        });

        return <section className="project single-item">
            <header>
                <aside className="aside-1">
                    <ul className="meta">{metaOne}</ul>
                </aside>
                <SlabText klass='fun-font giga' value={this.props.title} />
                <aside className="aside-2">
                    <ul className="meta">{metaTwo}</ul>
                </aside>
            </header>
            <article dangerouslySetInnerHTML = {{__html: this.props.content }}></article>
        </section>
    }

});
