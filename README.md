Commando-node
=========

A Commando.io API library for Node.js

## Installation

	npm install commando-node --save

## API Overview

	Every resource is accessed via your `commando` instance:

	```js
	var commando = require('commando')(' your commando API key ');
	// commando.{ RESOURCE_NAME }.{ METHOD_NAME }
	```

	Every resource method accepts an optional callback as the last argument:

	```js
	commando.servers.retrieve(
		{ id: 'srv_9GkE2IWvkzItmaTs5Agn8' },
		function(err, server) {
			err; // null if no error occurred
			server; // the server object
		}
	);
	```

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

