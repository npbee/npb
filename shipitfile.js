module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/npb',
            deployTo: '/home/deploy',
            repositoryUrl: 'https://github.com/npbee/npb',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2
        },
        production: {
            servers: 'deploy@npbee.me'
        }
    });

    shipit.task('npm-install', function() {
        shipit.remote('bash -l -c "cd /home/deploy/current && npm install"')
        .then(function(res) {
            console.log('NPM Install complete.');
            shipit.emit('npm-installed');
        });
    });


    // Symlink knexfile
    shipit.task('knexfile-link', function() {
        shipit.remote('ln -s /home/deploy/knexfile.js /home/deploy/current/knexfile.js')
        .then(function(res) {
            console.log('Knexfile linked.');
            shipit.emit('knexfile-linked');
        });
    });


    // Restart PM2
    shipit.task('restart-pm2', function() {
        shipit.remote('bash -l -c "pm2 startOrRestart ./current/pm2.json"')
        .then(function(res) {
            console.log('Restarted PM2');
            shipit.emit('pm2-restarted');
        });
    });

    shipit.on('cleaned', function() {
        shipit.start('npm-install');
    });

    shipit.on('npm-installed', function() {
        shipit.start('knexfile-link');
    });

    shipit.on('knexfile-linked', function() {
        shipit.start('restart-pm2');
    });

};
