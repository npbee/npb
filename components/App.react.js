'use strict';

var React = require('react');
var Home = require('./page/Home.react');

var Posts = require('./page/posts/Posts.react');
var PostShow = require('./page/posts/PostShow.react');
var PostNew = require('./page/posts/PostNew.react');

var Projects = require('./page/projects/Projects.react');
var Project = require('./page/projects/ProjectShow.react');

var NavList = require('./nav/NavList.react');
var RouterMixin = require('react-mini-router').RouterMixin;

var App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '/posts': 'posts',
        '/posts/new': 'postNew',
        '/posts/:slug': 'postShow',
        '/projects': 'projects',
        '/projects/:slug': 'projectShow'
    },

    home: function() {
        return <Home
                post={this.props.data.latestPost}
                project={this.props.data.latestProject}/>;
    },

    // POSTS
    posts: function() {
        return <Posts posts={this.props.data.posts} />;
    },

    postShow: function(slug) {
        return <PostShow post={this.props.data.post} slug={slug} />;
    },

    postNew: function() {
        return <PostNew />;
    },

    // PROJECTS
    projects: function() {
        return <Projects projects={this.props.data.projects} />;
    },

    projectShow: function(slug) {
        return <Project project={this.props.data.project} slug={slug} />;
    },

    render: function() {
        return <main id="react-app">
            <NavList />
            {this.renderCurrentRoute()}
        </main>
    }


});

module.exports = App;
