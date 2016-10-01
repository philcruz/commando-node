Commando-node
=========

A Commando.io API library for Node.js

## Installation

	npm install commando-node --save

## Usage

	var commando = require('commando-node')
		escape = commando.escape,
		unescape = commando.unescape;

	var html = '<h1>Hello World</h1>',
		escaped = escape(html),
		unescaped = unescape(escaped);

	console.log('html', html, 'escaped', escaped, 'unescaped', unescaped);


### Available resources & methods

*Where you see `params` it is a plain JavaScript object, e.g. `{ email: 'foo@example.com' }`*

* servers
	* [`list([params])`]
	* [`retrieve(serverId)`]
* groups
	* [`list([params])`]
	* [`retrieve(groupId)`]
* recipes
	* [`list([params])`]
	* [`retrieve(recipeId)`]
	* [`execute(recipeId)`]	


## Tests

	npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

