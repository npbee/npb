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


Connect on the command line:
psql -U username database_name

On VPS:

Switch to postgres user:
