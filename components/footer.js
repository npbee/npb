import { breakpoint, spacing } from '../lib/theme';
import Link from 'next/link';

export default function Footer() {
    return <footer>
        <hr />
        <div className="footer-content">
            <a href="https://github.com/npbee" target="_blank" rel="noopener" title="GitHub">
                GitHub
            </a>
        </div>
        <style jsx>{`
            hr {
                display: flex;
                align-items: center;
                outline: none;
                border: none;
                height: 1px;
                background: #d9d9d9;
                width: 100%;
                margin-left: auto;
                transition: width 300ms, background-color 300ms;
            }
            footer:hover hr {
                background-color: #ca3939;
            }
            footer:hover a {
                color: #333;
            }
            footer:hover svg {
                fill: #333;
            }
            .footer-content {
                display: flex;
                padding-top: ${spacing(2)}
                padding-bottom: ${spacing(2)}
                justify-content: space-between;
            }
            path {
                fill: #999;
                transition: fill 300ms;
            }
            footer a {
                display: flex;
                align-items: center;
                flex-direction: row;
                color: #999;
                text-decoration: none;
                margin-right: ${spacing(2)}
                cursor: pointer;
                transition: color 300ms;
            }
            footer a span {
                padding-left: ${spacing(2)};
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
