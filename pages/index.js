import Main from '../layouts/main';
import Avatar from '../components/avatar';
import { type, breakpoint } from '../lib/theme';

export default () => {
    return <Main>
        <Avatar />
        <p className="headline">
        Hi, I'm <strong>Nick Ball</strong>, a web developer currently focusing
        on the front end.  I enjoy minimal user interfaces, functional programming,
        and typography.  I work as a <strong>front-end engineer</strong>
        &nbsp;at <a target="_blank" rel="noopener" className="job" href="https://www.hellosign.com">HelloSign</a>.
        </p>
        <style jsx>{`
            .headline {
                font-size: ${type(2)}
                line-height: 1.5;
            }
            .job {
                color: #00A5D5;
            }

            @media only screen and (min-width: ${breakpoint(1)}) {
                .headline {
                    font-size: ${type(1)}
                }
            }
        `}</style>
    </Main>;
}
