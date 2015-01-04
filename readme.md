Start postgres database:
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

Create user:
createuser username

create db:
createdb -Ousername -Eutf8 database_name

USER:
nick

Reseed:
psql -U nick -d npb.com_dev -f /Users/npb/Dropbox/npb.prod.dump.sql

Initialize test DB
====
psql -U nick -d npb.com_test -f /Users/npb/Dropbox/npb.test.sql

### Dev Database
npb.com_dev

### Create a user
node --harmony ./lib/create_user {password}

Connect on the command line:
psql -U username database_name

On VPS:

Switch to postgres user:

### Tests
We're using generators here, so tests are using gulp-mocha-co and the gulp 
commands must be run with the harmony flag.  So to run the tests, just run 
the following command: 

`npm test`

This will set the node env to "testing," set the `--harmony` flag, start the 
server, and run the "test" gulp task.
