import Main from './main';
import { spacing, colors, type } from '../lib/theme';

export default function({ children, date }) {
    return <Main post>
        <time>{date}</time>
        <div
            className='post-content'
            dangerouslySetInnerHTML={{ __html: children }}
        />
        <style jsx>{`
            time {
                color: ${colors.muted};
                display: block;
                margin-top: 3rem;
                text-transform: uppercase;
                font-size: ${type(6)};
                letter-spacing: 0.1em;
            }
        `}</style>
        <style jsx global>{`
            .post-content h1,
            .post-content h2,
            .post-content h3,
            .post-content h4,
            .post-content h5,
            .post-content h6 {
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            .post-content h2,
            .post-content h3,
            .post-content h4,
            .post-content h5,
            .post-content h6 {
                font-size: 1.4rem;
                margin-top: 3rem;
            }

            .post-content h1 {
                margin-top: 5px;
            }

            .post-content > p,
            .post-content > ul {
                font-size: 1.5rem;
                line-height: 1.625;
            }
            .post-content blockquote {
                margin-left: 0;
                margin-top: 0;
                padding-left: ${spacing(4)};
                border-left: 0.25rem solid ${colors.grey}
                color: ${colors.muted};
                font-size: ${type(3)}
            }
            .post-content hr {
                margin-top: ${spacing(4)}
                margin-bottom: ${spacing(4)}
                border: none;
                height: 1px;
                background-color: ${colors.grey};
            }
        `}</style>
    </Main>
}
