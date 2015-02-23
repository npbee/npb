var React = require('react');
var Snippet = require('../Snippet.react');
var request = require('superagent');

module.exports = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    componentDidMount: function() {
    },

    render: function(){
        var blurb = `And welcome.  My name is Nick.  I am a self-professed nerd 
        and web development apprentice.  My main focus so far has been Javascript
         and the front-end, but I'm eager to expand.  I'm currently a Jr. 
        Software Engineer at <a href="http://loudr.fm">Loudr</a>.`;

        return (
            <section className="connect skinny single-item">
                <h1 className="giga">Welcome</h1>
                <article>
                    <p>
                    And hello.  My name is Nick.  I am a self-professed nerd·
                    and self-taught web development apprentice.  My main focus 
                    so far has been Javascript and the front-end, but I'm eager 
                    to expand.  I'm currently a Jr. Software Engineer at 
                    <a href="http://loudr.fm">Loudr</a> working on a large 
                    KnockoutJS application.  
                    </p>
                    <p>
                        You can find me on <a className="standout-link" href="http://github.com/npbee">Github
                        </a>, <a className="standout-link" href="http://twitter.com/npbeep">Twitter</a>,
                        or <a className="standout-link" href="mailto: nick@npbee.me">Email</a>.
                    </p>
                    <p>This site was built with:
                        <ul>
                            <li><a href="https://iojs.org">iojs (NodeJS)</a></li>
                            <li><a href="http://www.postgresql.org/">Postgresql</a></li>
                            <li><a href="http://facebook.github.io/react/">React</a></li>
                            <li><a href="https://facebook.github.io/flux/">Flux</a></li>
                            <li><a href="http://browserify.org/">Browserify</a></li>
                            <li><a href="https://babeljs.io/">Babel</a></li>
                            <li><a href="http://sass-lang.com/">SASS</a></li>
                            <li><a href="http://csswizardry.com/typecsset/">Typecsset</a></li>
                            <li><a href="http://gulpjs.com/">Gulp</a></li>
                        </ul>
                    </p>
                    <p>Thank you for looking!</p>
                </article>
            </section>
            )

    }

});
