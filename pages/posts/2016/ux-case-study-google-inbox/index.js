import Post from '../../../../layouts/post';
import content from './index.json';

export default function() {
    return <Post date='February 27, 2016'>
        {content.content}
    </Post>;
}
