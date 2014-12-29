'use strict';

var React = require('react');
var Home = require('./page/Home.react');

var Posts = require('./post/index');
var PostShow = require('./post/show');
var PostNew = require('./post/new');
var PostEdit = require('./post/edit');

var Projects = require('./page/projects/Projects.react');
var Project = require('./page/projects/ProjectShow.react');

var NavList = require('./nav/NavList.react');
var RouterMixin = require('react-mini-router').RouterMixin;

var App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'home',

        // Posts
        '/posts': 'posts',
        '/posts/new': 'postNew',
        '/posts/:slug': 'postShow',
        '/posts/:id/edit': 'postEdit',

        // Projects
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

    postEdit: function(id) {
        return <PostEdit postId={id} />;
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
