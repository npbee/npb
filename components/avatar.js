import Link from 'next/link';

export default () => {
    return <Link href="/">
        <a className="avatar">
            <img src="/static/avatar.jpeg" />
            <style jsx>{`
                .avatar img {
                    border-radius: 100%;
                    width: 65px;
                }
            `}</style>
        </a>
    </Link>;
}
