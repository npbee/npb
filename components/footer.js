import { breakpoint, spacing } from '../lib/theme';
import Link from 'next/link';

export default function Footer() {
    return <footer>
        <hr />
        <div className="footer-content">
            <a href="https://github.com/npbee" target="_blank" rel="noopener">
                GitHub
            </a>
            <Link href="/resume">
                <a>Resume</a>
            </Link>
            <a href="https://github.com/npbee" target="_blank" rel="noopener">
                Src
            </a>
            <a href="https://github.com/npbee" target="_blank" rel="noopener">
                Other
            </a>
        </div>
        <style jsx>{`
            hr {
                outline: none;
                border: none;
                height: 1px;
                background: #d9d9d9;
                width: 50px;
                margin-left: auto;
            }
            .footer-content {
                display: flex;
                padding-top: ${spacing(2)}
                padding-bottom: ${spacing(2)}
                text-transform: lowercase;
                justify-content: space-between;
            }
            footer a {
                display: flex;
                align-items: center;
                flex-direction: row;
                color: #666;
                text-decoration: none;
                margin-right: ${spacing(2)}
            }

            @media only screen and (min-width: ${breakpoint(1)}) {
                hr {
                    margin-left: 0;
                }
                .footer-content {
                    justify-content: flex-start;
                }
            }
        `}</style>
    </footer>;
}
