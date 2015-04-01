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

    // Migrate
    shipit.task('migrate', function() {
        shipit.remote('bash -l -c "cd /home/deploy/current && NODE_ENV=production knex migrate:latest"');
    });

    // Symlink node_modules
    shipit.task('npm-link', function() {
        shipit.remote('ln -s /home/deploy/node_modules /home/deploy/current/node_modules')
        .then(function(res) {
            console.log('NPM linked.');
            shipit.emit('npm-linked');
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
        shipit.start('npm-link');
    });

    shipit.on('npm-linked', function() {
        shipit.start('knexfile-link');
    });

    shipit.on('knexfile-linked', function() {
        shipit.start('restart-pm2');
    });

};
