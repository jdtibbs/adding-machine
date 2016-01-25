# Calculator 

[![Build Status](https://travis-ci.org/jdtibbs/calculator.svg?branch=master)](https://travis-ci.org/jdtibbs/calculator)

A simple adding machine.

Running on Heroku [here](https://jdt-calculator.herokuapp.com/). 

## Information

* Brunch
    * Configuration: 
    	* See brunch-config.js
    	* Brunch defaults to using CommonJS modules.
	* Build:
    	* `brunch build --production` builds minified project into /public for production.
	* Run:
		* Dev
			* `brunch watch --server` watches the project with continuous rebuild. This will also launch HTTP server.
		* Heroku
			* test local via `heroku local web`	
		* Production
			* `npm start` (see package.json "scripts" Note NODE_ENV setting)
	* Test
		* All tests: `npm run test`
		* Individual test: `node ./app/services/round.service.test.js`
		
* Travis CI
	* Provides continuous integration service to build, test, and deploy.

* Tape
	* TAP-producing test harness for node and browses.
	* See "scripts":{} in package.json for run configuration.
	* Reading:
		* [Why I Use Tape Instead of Mocha & So Should You](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.71rnxb1c9)
		* [Testing JavaScript Modules with Tape](https://ponyfoo.com/articles/testing-javascript-modules-with-tape)
