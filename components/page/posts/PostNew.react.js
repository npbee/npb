var React = require('react');
var Snippet = require('../../Snippet.react');
var request = require('superagent');
var marked = require('marked');

module.exports = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    componentDidMount: function() {
    },

    render: function(){
        return (
            <section className="post">
                <h1>New Post</h1>
                <form action="/posts/" method="post">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" />
                    <br/>

                    <textarea name="body"></textarea>
                    <br/>

                    <label htmlFor="slug">Slug</label>
                    <input type="text" name="slug" />
                    <br/>

                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" />
                    <br/>

                    <label htmlFor="excerpt">Excerpt</label>
                    <input type="text" name="excerpt" />
                    <br/>

                    <label htmlFor="published">Published?</label>
                    <input type="checkbox" name="published" />
                    <br/>
                    
                    <button type="submit">Create Post</button>
                </form>
            </section>
        );

    }

});
