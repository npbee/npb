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

    // Only run on command.  This will install the node_modules to the direct
    // above the current directory.  This is so we don't have to install modules
    // everytime.  
    shipit.task('npm-install', function() {
        shipit.remote('bash -l -c "cd /home/deploy/current && npm install"')
        .then(function(res) {
            console.log('NPM Install complete.');
        });
    });


    // Symlink knexfile
    shipit.task('knexfile-link', function() {
        shipit.remote('ln -s /home/deploy/knexfile.js /home/deploy/current/knexfile.js')
        .then(function(res) {
            console.log('Knexfile linked.');
        });
    });


    // Restart PM2
    shipit.task('restart-pm2', function() {
        shipit.remote('bash -l -c "pm2 startOrRestart ./current/pm2.json"')
        .then(function(res) {
            console.log('Restarted PM2');
        });
    });

};
