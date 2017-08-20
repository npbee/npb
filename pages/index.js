import Main from '../layouts/main';
import Link from 'next/link';
import { spacing, type, breakpoint, colors } from '../lib/theme';
import posts from '../posts';

function Post({ id, date, title }) {
    const year = new Date(date).getFullYear();
    const href = `/posts/${year}/${id}`;

    return <div>
        <Link href={href} prefetch><a>{title} </a></Link>
        <time>{date}</time>

        <style jsx>{`
            div {
                margin-bottom: ${spacing(4)};
            }
            time {
                display: block;
                color: ${colors.muted};
                font-size: ${type(4)};
            }
            a {
                display: block;
                color: ${colors.primary};
                text-decoration: none;
                font-size: ${type(3)};
                margin-bottom: ${spacing(1)};
            }
        `}</style>
    </div>;
}

export default () => {
    return <Main>
        <p className="headline">
        Hi, I'm <strong>Nick Ball</strong>, a web developer currently focusing
        on the front end.  I enjoy minimal user interfaces, functional programming,
        and typography.  I work as a <strong>front-end engineer</strong>
        &nbsp;at <a target="_blank" rel="noopener" className="job" href="https://www.hellosign.com">HelloSign</a>.
        </p>

        <h2>Posts</h2>
        {posts.posts.map(post => <Post key={post.id} {...post} />)}
        <style jsx>{`
            .headline {
                font-size: ${type(2)}
                line-height: 1.5;
                margin-bottom: ${spacing(5)};
            }
            .job {
                color: #00A5D5;
            }

            h2 {
                text-transform: uppercase;
                font-size: 1rem;
                letter-spacing: 0.1em;
            }

            @media only screen and (min-width: ${breakpoint(1)}) {
                .headline {
                    font-size: ${type(1)}
                }
            }
        `}</style>
    </Main>;
}

