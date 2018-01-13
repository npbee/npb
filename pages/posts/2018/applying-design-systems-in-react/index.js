import Post from "../../../../layouts/post";
import content from "./index.json";

export default function() {
    return (
        <div>
            <Post date="January 18th, 2018">{content.content}</Post>
            <style jsx global>{`
                .example {
                    background: #fff;
                    padding: 12px;
                    border: 1px solid #d9d9d9;
                    border-radius: 3px;
                }
                .input-component {
                    display: flex;
                    flex-direction: column;
                }
                .input-component > label {
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    margin-bottom: 12px;
                }
                .input-component > input {
                    margin-bottom: 8px;
                    padding: 8px;
                    border-radius: 3px;
                    border: 1px solid #d9d9d9;
                    font-size: 1rem;
                    color: #a0a0a0;
                    font-family: avenir next, avenir, sans-serif;
                }
            `}</style>
        </div>
    );
}
