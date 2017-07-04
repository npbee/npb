import { type, spacing } from '../lib/theme';
import Experience from '../components/experience';
import Resume from '../layouts/resume';

const hellosign = {
    color: '#00b3e6',
    name: 'HelloSign',
    logo: 'hellosign.png',
    site: 'https://www.hellosign.com',
    roles: [
        'Front-end Engineer'
    ],
    dates: ['Oct. 2016', 'Present'],
    highlights: [
        'React',
        'UI',
        'Component Library',
        'Elixir'
    ]
};

const loudr = {
    color: '#05AFC1',
    name: 'Loudr',
    logo: 'loudr.png',
    site: 'https://www.loudr.fm',
    roles: [
        'Front-end Engineer',
        'Jr. Front-end Engineer'
    ],
    dates: ['Nov. 2014', 'Oct. 2016'],
    highlights: [
        'React',
        'Knockout',
        'Framework Design',
        'Tooling & Deployment'
    ]
};

const sayMedia = {
    color: '#CF1F37',
    name: 'Say Media, Inc.',
    logo: 'say.png',
    site: 'https://www.saymedia.com/',
    roles: [
        'Senior Ad Operator'
    ],
    dates: ['Aug. 2008', 'Nov. 2014'],
    highlights: []
};

const experiences = [
    hellosign,
    loudr,
    sayMedia
];

export default () => {
    return <Resume>
        <div className="intro">
            <h1>Nick Ball</h1>
            <p>San Francisco, CA</p>
            <p><a href="https://github.com/npbee" target="_blank" rel="noopener">GitHub</a></p>
        </div>

        <section>
            <strong className='small-header'>Experience</strong>
            {experiences.map(exp => <Experience {...exp} />)}
        </section>

        <section>
            <strong className='small-header'>Education</strong>
            <p>
                B.S. Management Science
                <em className='block'>University of California, San Diego</em>
            </p>
        </section>
        <style jsx>{`
            .block {
                display: block;
            }
            .intro {
                margin-bottom: ${spacing(4)};
            }
            .intro h1 {
                margin-bottom: ${spacing(1)};
            }
            .intro p {
                margin: ${spacing(1)} auto;
            }
            .intro a {
                color: #333;
            }
            h1 {
                font-size: 3rem;
            }
            section {
                margin-bottom: ${spacing(4)};
            }
            .small-header {
                color: #666;
                display: block;
                text-transform: uppercase;
                font-size: ${type(6)};
                letter-spacing: 1px;
                // border-bottom: 1px solid #666;
                margin-bottom: ${spacing(3)};
            }
        `}</style>
    </Resume>;
}
