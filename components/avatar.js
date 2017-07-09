export default () => {
    return <div className="avatar">
        <img src="/static/avatar.jpeg" />
        <style jsx>{`
            .avatar img {
                border-radius: 100%;
                width: 65px;
            }
        `}</style>
    </div>;
}
