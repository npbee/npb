import Head from 'next/head';
import style from './style';
import Avatar from '../components/avatar';
import Footer from '../components/footer';
import { breakpoint, spacing } from '../lib/theme';

export default ({ children, post }) => {
    return <main className={post ? 'post' : ''}>
        <Head>
            <link rel="stylesheet" type="text/css" href="//cloud.typography.com/7821852/748866/css/fonts.css" />
            <link rel="icon" type="image/png" href="static/favicon/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="static/favicon/android-chrome-192x192.png" sizes="192x192" />
            <link rel="icon" type="image/png" href="static/favicon/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/png" href="static/favicon/favicon-16x16.png" sizes="16x16" />
            <title>Nick Ball</title>
            <meta name="viewport" content="width=device-width" />
            <script dangerouslySetInnerHTML={{ __html: `
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-46265154-1', 'auto');
                ga('send', 'pageview');
                `}} />
        </Head>

        <Avatar />

        <div className='content'>
            {children}
        </div>

        <Footer />

        <style jsx>{`
            main {
                display: flex;
                flex-direction: column;
                margin-left: auto;
                margin-right: auto;
                padding: ${spacing(3)}
                width: 100%;
                max-width: 900px;
                min-height: calc(100vh - ${spacing(3)});
            }
            main.post {
                max-width: 48em;
            }
            .content {
                flex: 1;
                margin-bottom: ${spacing(4)};
            }
        `}</style>

        <style jsx global>{style}</style>
    </main>
}
