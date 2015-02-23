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
        console.log(this.props.loaded);
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
                <p>
                    {this.props.tag.posts && this.props.tag.posts.map( post => <a 
                        key={post.id}
                        className="block-link"
                        href={"/posts/" + post.slug}>{post.title}</a>)}
                </p>
                <h2>Projects</h2>
                <p>
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
                    <aside className="aside-1">
                        <ul className="meta">{metaOne}</ul>
                    </aside>
                    <SlabText klass='fun-font mega' value={this.props.title} />
                    <aside className="aside-2">
                        <ul className="meta">{metaTwo}</ul>
                    </aside>
                </header>
                <article dangerouslySetInnerHTML = {{__html: this.props.content }}></article>
                {tag}
            </section>
        } else {
            return <div className="loader" />;
        }
    }

});
