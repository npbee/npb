var React = require('react');

module.exports = React.createClass({

    componentDidMount: function() {

        if (window.DISQUS) {
            DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.indentifier = document.location.pathname.split('/')[2] || 'whoops';
                    this.page.url = document.location.href;
                }
            });
        } else {
            var disqus_shortname = 'npbee';

            var dsq = this.disqus = document.createElement('script');
            dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        }
    },

    componentWillUnmount: function() {
        if (this.disqus && this.disqus.parentNode) {
            this.disqus.parentNode.removeChild(this.disqus);
            this.disqus = null;
        }
    },

    render: function() {
        return <div className='disqus'>
            <div id="disqus_thread"></div>
        </div>;
    }
});
