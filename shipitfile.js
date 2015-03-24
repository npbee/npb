module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

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

    shipit.task('npm-install', function() {
        shipit.remote('bash -l -c "cd /home/deploy/current && npm install"')
        .then(function(res) {
            console.log(res);
        });
    });

    //shipit.on('cleaned', function() {
        //shipit.start('npm-install');
    //});

};
