![npb logo](http://npbee.me/assets/images/logo.svg)
----

Site files for [Kinmill](http://kinmill.com).


Dependencies
-------------------

* Vagrant
  * Vagrant berkshelf
  * Vagrant omnibus
* Berkshelf


Backend
-----------------------

* Ruby 2.1.2
* Rails 4.1.1
* Postgresql


Frontend
-----------------------

* SASS
  * Inuit CSS
  * Bourbon / Bourbon Neat
* RequireJS
* Gulp for build system


Development
-------------------

* Start the dev server with ```vagrant up```

* Start frontend development with ```gulp```

* Build frontent assets for production with ``` gulp build```


Making Development Server Changes
------------------------------------
If you need to make changes to the server, update the Berksfile with the
appropriate cookbooks.


Provisioning
-----------------
```Knife solo prepare root@....```

 ```Knife solo cook root@...```

 ```Cap production deploy:setup_config```

 ```cap production deploy```

