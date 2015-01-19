var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');
var marked = require('marked');
var parseDate = require('../../lib/format_date');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            project: this.props.project || {},
            slug: this.props.slug || ''
        };
    },

    componentDidMount: function() {
       var self = this;
       var slug = this.state.slug;

       request.get('/projects/' + slug)
       .query({
           query: 'isClient'
       })
       .end(function(res) {
           self.setState({
               project: JSON.parse(res.text).project
           });
       });
    },

    render: function(){
        var html = marked(this.state.project.body || '');
        var date = parseDate(this.state.project.date_completed);

        return (
            <section className="project section section--aside">
                <aside>Hi</aside>
                <header>
                    <h1 className="fun-font giga">{this.state.project.name}</h1>
                    <ul className="summary-list">
                        <li>
                            <h2>Date Completed:</h2>
                            <p>{date}</p>
                        </li>
                        <li>
                            <h2>Role:</h2>
                            <p>{this.state.project.role}</p>
                        </li>
                    </ul>
                </header>
                <article dangerouslySetInnerHTML = {{__html: html }}></article>
            </section>
        )

    }

});
