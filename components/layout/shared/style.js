export default `
    * { box-sizing: border-box }
    body {
        margin: 0;
        background: #f9f9f9;
        color: #444;
        font-family: 'Chronicle Display A', 'Chronicle Display B', georgia, times, serif;
        font-weight: 300;
        font-size: 1rem;
    }

    code,
    pre[class*="language-"] {
        color: #ccc;
        line-height: 1.5;
        border-radius: 3px;
        font-family: 'Ubuntu Mono', Monaco, 'Andale Mono', monospace;
        white-space: pre;
        white-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
    }

    /* code blocks */
     pre[class*="lang-"] {
        padding: 16px;
        margin: 8px 0;
        overflow: auto;
    }

    :not(pre) > code[class*="lang-"],
    pre[class*="lang-"] {
        background: #2d2d2d;
    }

    /* Inline code */
    :not(pre) > code {
        padding: .2em .4em;
        border-radius: .3em;
        font-size: 85%;
        background: #2d2d2d;
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
            color: #999;
    }

    .token.punctuation {
            color: #ccc;
    }

    .token.tag,
    .token.attr-name,
    .token.namespace,
    .token.deleted {
            color: #e2777a;
    }

    .token.function-name {
            color: #6196cc;
    }

    .token.boolean,
    .token.number,
    .token.function {
            color: #f08d49;
    }

    .token.property,
    .token.class-name,
    .token.constant,
    .token.symbol {
            color: #f8c555;
    }

    .token.selector,
    .token.important,
    .token.atrule,
    .token.keyword,
    .token.builtin {
            color: #cc99cd;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable {
            color: #7ec699;
    }

    .token.operator,
    .token.entity,
    .token.url {
            color: #67cdcc;
    }

    .token.important,
    .token.bold {
            font-weight: bold;
    }
    .token.italic {
            font-style: italic;
    }

    .token.entity {
            cursor: help;
    }

    .token.inserted {
            color: green;
    }

`;
