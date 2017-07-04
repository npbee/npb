import Head from 'next/head';
import style from './style';
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
        </Head>

        <div className='content'>
            {children}
        </div>

        <style jsx>{`
            main {
                display: flex;
                flex-direction: column;
                margin-left: auto;
                margin-right: auto;
                padding: ${spacing(3)}
                width: 100%;
                max-width: 700px;
                min-height: 100vh;
            }
            .content {
                flex: 1;
            }
        `}</style>

        <style jsx global>{style}</style>
    </main>
}
