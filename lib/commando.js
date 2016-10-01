
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

	//this._prepResources();
	this.setApiAuth(alias, secret);
}

Commando.prototype = {

	config: function() {
		return {
			"alias" : process.env.COMMANDO_ALIAS || "your-account-alias",
			"secret" : process.env.COMMANDO_SECRET || "your-secret-key"
		};
	},

	servers: {
		list: function(){ return "servers"; },
		retrieve: function(serverId){ return serverId; },
	},

	about: function(callback) {
		var options = {
			host: this.getApiField('host'),
			port: 443,
			path: '/v1',
			auth: this.getApiField('auth'),
			method: 'GET'
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
	}

};

module.exports = Commando;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Commando = Commando;