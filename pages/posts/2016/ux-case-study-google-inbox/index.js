import Head from 'next/head';
import Post from '../../../../layouts/post';
import content from './index.json';

export default function() {
    return <div>
        <Head>
            <script src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
        </Head>
        <Post date='February 27, 2016'>
            {content.content}
        </Post>
    </div>;
}
