module.exports = function(shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/npb',
            deployTo: '/home/deploy',
            dirToCopy: 'build',
            repositoryUrl: 'git@github.com:npbee/npb.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            shallowClone: true
        },
        production: {
            servers: 'deploy@npbee.me'
        }
    });
};
