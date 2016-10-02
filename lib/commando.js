
'use strict';

Commando.DEFAULT_HOST = 'api.commando.io';
Commando.DEFAULT_PORT = 443;
Commando.DEFAULT_BASE_PATH = '/v1';
Commando.DEFAULT_TIMEOUT = 60;

process.env['API_HOST'] = 'api.commando.io'

// If undefined in our process load our local file
// (i.e. we aren't on an external server where we set these differently)
if(!process.env.COMMANDO_ALIAS) {
	var env = require('../config.js')
}

var https = require('https');

var resources = {
	Servers: require('./resources/Servers'),
	Groups: require('./resources/Groups'),
	Recipes: require('./resources/Recipes'),
	ExecutionQueue: require('./resources/ExecutionQueue')
};

function Commando(alias, secret) {
	if (!(this instanceof Commando)) {
		return new Commando(alias, secret);
	}

	this._api = {
		auth: null,
		host: Commando.DEFAULT_HOST,
		port: Commando.DEFAULT_PORT,
		basePath: Commando.DEFAULT_BASE_PATH,
		timeout: Commando.DEFAULT_TIMEOUT,
	};

	this.setApiAuth(alias, secret);
	this._initResources();

}

Commando.prototype = {

	config: function() {
		return {
			"alias" : process.env.COMMANDO_ALIAS || "your-account-alias",
			"secret" : process.env.COMMANDO_SECRET || "your-secret-key"
		};
	},

	about: function(callback) {
		var options = {
			host: this.getApiField('host'),
			port: this.getApiField('port'),
			auth: this.getApiField('auth'),
			method: 'GET',
			path: '/v1'
		};
		var request = https.request( options, callback);
		request.end();
	},

	setApiAuth: function(alias, secret) {
		if (alias && secret) {
			this._setApiField(
				'auth',
				alias + ':' + secret
			);
		}
	},

	_setApiField: function(key, value) {
		this._api[key] = value;
	},

	getApiField: function(key) {
		return this._api[key];
	},

	_initResources: function() {
	 for (var name in resources) {
		 this[
			 name[0].toLowerCase() + name.substring(1)
		 ] = new resources[name](this);
	 }
	 //this['servers'] = new resources['Servers'](this);
 },


};

module.exports = Commando;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Commando = Commando;