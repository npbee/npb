'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Home = require('./page/Home.react');

var Posts = require('./post/index');
var PostShow = require('./post/show');
var PostNew = require('./post/new');
var PostEdit = require('./post/edit');

var Projects = require('./project/index');
var ProjectShow = require('./project/show');
var ProjectNew = require('./project/new');
var ProjectEdit = require('./project/edit');

var Tags = require('./tag/index');
var TagShow = require('./tag/show');
var TagEdit = require('./tag/edit');

var Login = require('./auth/login');

var Admin = require('./admin/index');

var NavList = require('./nav/NavList.react');
var RouterMixin = require('react-mini-router').RouterMixin;

var NavStore = require('../stores/NavStore');
var NavActions = require('../actions/NavActions');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var App = React.createClass({

    mixins: [RouterMixin],

    getInitialState: function() {
        return {
            isNavOpen: NavStore.isOpen(),
            undoCbs: AppStore.undoCbs(),
            isAuthenticated: AppStore.isAuthenticated()
        }
    },

    componentDidMount: function() {
        NavStore.addChangeListener(this._onChange);
        AppStore.addChangeListener(this._onChange);

        AppActions.authenticate(this.props.data.isAuthenticated);
    },

    componentWillUnmount: function() {
        NavStore.removeChangeListener(this._onChange);
        AppStore.removeChangeListener(this._onChange);
    },

    routes: {
        '/': 'home',

        // Auth
        '/login': 'login',

        // Posts
        '/posts': 'posts',
        '/posts/new': 'postNew',
        '/posts/:slug': 'postShow',
        '/posts/:slug/edit': 'postEdit',

        // Projects
        '/projects': 'projects',
        '/projects/new': 'projectNew',
        '/projects/:slug': 'projectShow',
        '/projects/:slug/edit': 'projectEdit',

        // Tags
        '/tags': 'tags',
        '/tags/:slug': 'tagShow',
        '/tags/:slug/edit': 'tagEdit',

        // Admin
        '/admin': 'admin'
    },

    home: function() {
        return <Home
                post={this.props.data.post}
                project={this.props.data.project}/>;
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

    postEdit: function(slug) {
        return <PostEdit post={this.props.data.post} slug={slug} />;
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

    projectEdit: function(slug) {
        return <ProjectEdit project={this.props.data.project} slug={slug} />;
    },

    // Tags
    tags: function() {
        return <Tags tags={this.props.data.tags} />;
    },

    tagShow: function(slug) {
        return <TagShow 
            tag={this.props.data.tag} 
            slug={slug}
            isAuthenticated={this.props.data.isAuthenticated} />;
    },

    tagEdit: function(slug) {
        return <TagEdit tag={this.props.data.tag} slug={slug} />;
    },

    admin: function() {
        return <Admin data={this.props.data} />;
    },

    render: function() {
        var _className;
        
        if (this.state.isNavOpen) {
            _className = 'main-nav--open';
        }

        // If typeof undlink === function?
        var undoLinks = this.state.undoCbs.map(function(cb, index) {
            if (typeof cb === 'function') {
                return <div className="alert alert--warning" key={cb + index}>
                    <img src="/static/images/icons/icomoon/user.svg" />
                    <a onClick={cb}>Undo?</a> 
                </div>
            } else {
                return null;
            }
        });

        return <main id="react-app" className={_className}>
            <NavList 
                isAuthenticated={this.state.isAuthenticated}
                data={this.props.data} />
            <ReactCSSTransitionGroup transitionName="fade">
                {undoLinks}
            </ReactCSSTransitionGroup>
            {this.renderCurrentRoute()}
        </main>
    },

    _onChange: function() {
        this.setState({
            isNavOpen: NavStore.isOpen(),
            undoCbs: AppStore.undoCbs(),
            isAuthenticated: AppStore.isAuthenticated()
        })
    }


});

module.exports = App;
