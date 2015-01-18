'use strict';

var React = require('react');
var Home = require('./page/Home.react');

var Posts = require('./post/index');
var PostShow = require('./post/show');
var PostNew = require('./post/new');
var PostEdit = require('./post/edit');

var Projects = require('./project/index');
var ProjectShow = require('./project/show');
var ProjectNew = require('./project/new');
var ProjectEdit = require('./project/edit');

var Login = require('./auth/login');

var NavList = require('./nav/NavList.react');
var RouterMixin = require('react-mini-router').RouterMixin;

var NavStore = require('../stores/NavStore');
var NavActions = require('../actions/NavActions');

var AppStore = require('../stores/AppStore');

var App = React.createClass({

    mixins: [RouterMixin],

    getInitialState: function() {
        isNavOpen: NavStore.isOpen()
    },

    componentDidMount: function() {
        NavStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        NavStore.removeChangeListener(this._onChange);
    },

    routes: {
        '/': 'home',

        // Auth
        '/login': 'login',

        // Posts
        '/posts': 'posts',
        '/posts/new': 'postNew',
        '/posts/:slug': 'postShow',
        '/posts/:id/edit': 'postEdit',

        // Projects
        '/projects': 'projects',
        '/projects/new': 'projectNew',
        '/projects/:slug': 'projectShow',
        '/projects/:id/edit': 'projectEdit'
    },

    home: function() {
        return <Home
                post={this.props.data.latestPost}
                project={this.props.data.latestProject}/>;
    },

    // AUTH
    login: function() {
        return <Login />
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
        return <ProjectShow 
            project={this.props.data.project} 
            slug={slug}
            isAuthenticated={this.props.data.isAuthenticated} />;
    },

    projectNew: function() {
        return <ProjectNew />;
    },

    projectEdit: function(id) {
        return <ProjectEdit projectId={id} />;
    },

    render: function() {
        var _className;
        
        if (this.state.isNavOpen) {
            _className = 'main-nav--open';
        }

        return <main id="react-app" className={_className}>
            <NavList 
                isAuthenticated={this.props.data.isAuthenticated}
                data={this.props.data} />
            {this.renderCurrentRoute()}
        </main>
    },

    _onChange: function() {
        this.setState({
            isNavOpen: NavStore.isOpen()
        })
    }


});

module.exports = App;
