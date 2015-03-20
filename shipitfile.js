module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    //require('shipit-npm')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/npb',
            deployTo: '/home/deploy',
            repositoryUrl: 'https://github.com/npbee/npb',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            key: '~/.ssh/id_rsa.pub',
            shallowClone: true
        },
        production: {
            servers: 'deploy@npbee.me'
        }
    });

};
