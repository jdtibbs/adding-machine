# Adding Machine

[![Build Status](https://travis-ci.org/jdtibbs/adding-machine.svg?branch=master)](https://travis-ci.org/jdtibbs/adding-machine)

A simple adding machine.

Running [here](https://jdt-adding-machine.herokuapp.com/) on Heroku. 

## Information

* Brunch
	* Provides build and development hot re-loading.
    * Configuration: 
    	* See brunch-config.js
    	* Brunch defaults to using CommonJS modules.
	* Build:
    	* `brunch build --production` builds minified project into /public for production.
	* Run:
		* Dev
			* `brunch watch --server` watches the project with continuous rebuild. This will also launch HTTP server.
			* 'npm start' runs using the node.js server. See server.js.
	* Test
		* All tests: `npm test`
		* Individual test: `node ./app/directory/file.name.test.js`

* [Heroku](https://www.heroku.com/home)
	* Deployed in Heroku using a custom build using Brunch, see package.json "scripts":postinstall".  This allows for the same Dev and Prod workflow.
	* Deploy from the Heroku dashboard, at the moment, using the GitHub deployment method, on push to the GitHub master branch.

* Node
	* Note the brunch dependencies in package.json "dependencies".  These are here for use by the production build on Heroku.  If not here the "postinstall" will not build the project and will not tell you so.

* Tape
	* TAP-producing test harness for node and browses.
	* See "scripts":"test" in package.json for run configuration.
	* Reading:
		* [Why I Use Tape Instead of Mocha & So Should You](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.71rnxb1c9)
		* [Testing JavaScript Modules with Tape](https://ponyfoo.com/articles/testing-javascript-modules-with-tape)

* Travis CI
	* Provides continuous integration service to build, test, and deploy.
