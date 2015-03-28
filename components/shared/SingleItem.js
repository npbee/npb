/**********
 * SINGLE ITEM
 *
 * This component is for blog posts, project posts, etc.  Anything that needs
 * to be displayed with the side bar and long text body
 **********/
var React = require('react');
var SlabText = require('./SlabText');

module.exports = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    render: function() {
        var metaOne = this.props.metaOne.map(function(item, index) {
            return <li key={index}>
                <h2 className="meta__header">{item.title}</h2>
                <p className="meta__value">{item.value}</p>
            </li>
        });

        var metaTwo = this.props.metaTwo.map(function(item, index) {
            return <li key={index}>
                <h2 className="meta__header">{item.title}</h2>
                <p className="meta__value">{item.value}</p>
            </li>
        });

        var tag;
        if (this.props.tag) {
            tag = <article>
                <h2>Posts</h2>
                <p className="muted small-margin-bottom">
                    {this.props.tag.posts && this.props.tag.posts.map( post => <a 
                        key={post.id}
                        className="block-link"
                        href={"/posts/" + post.slug}>{post.title}</a>)}
                </p>
                <hr className="rule rule--small left-align" />
                <h2>Projects</h2>
                <p className="muted no-margin-bottom">
                    {this.props.tag.projects && this.props.tag.projects.map( project => <a 
                        key={project.id}
                        className="block-link"
                        href={"/projects/" + project.slug}>{project.name}</a>)}
                </p>
            </article>;
        }


        if (this.props.loaded) {
            return <section className="project single-item">
                <header>
                    <h1 className="fun-font">{this.props.title}</h1>
                </header>
                <article dangerouslySetInnerHTML = {{__html: this.props.content }}></article>
                {tag}
                <hr className="rule skinny" />
                <div className="meta">
                    <ul className="meta__item">{metaOne}</ul>
                    <ul className="meta__item">{metaTwo}</ul>
                </div>
            </section>
        } else {
            return <div className="loader" />;
        }
    }

});
