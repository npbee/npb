import Head from 'next/head';
import style from './style';
import Avatar from '../components/avatar';
import Footer from '../components/footer';
import { breakpoint, spacing } from '../lib/theme';

export default ({ children }) => {
    return <main>
        <Head>
            <link rel="stylesheet" type="text/css" href="//cloud.typography.com/7821852/748866/css/fonts.css" />
            <link rel="icon" type="image/png" href="static/favicon/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="static/favicon/android-chrome-192x192.png" sizes="192x192" />
            <link rel="icon" type="image/png" href="static/favicon/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/png" href="static/favicon/favicon-16x16.png" sizes="16x16" />
            <title>Nick Ball</title>
            <meta name="viewport" content="width=device-width" />
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
            .content {
                flex: 1;
            }
        `}</style>

        <style jsx global>{style}</style>
    </main>
}
