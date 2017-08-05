import Main from '../../../layouts/main';
import content from './learning-elixir.json';

export default function() {
    return <Main>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </Main>;
}
