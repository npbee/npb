import Post from '../../../../layouts/post';
import content from './index.json';

export default function() {
    return <Post date='August 20th, 2017'>
        {content.content}
    </Post>;
}
