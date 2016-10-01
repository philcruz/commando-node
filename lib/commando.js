
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

function Commando(key, version) {
	if (!(this instanceof Commando)) {
		return new Commando(key, version);
	}

	this._api = {
		auth: null,
		host: Commando.DEFAULT_HOST,
		port: Commando.DEFAULT_PORT,
		basePath: Commando.DEFAULT_BASE_PATH,
		timeout: Commando.DEFAULT_TIMEOUT,
	};

	//this._prepResources();
	//this.setApiKey(key);
	//this.setApiVersion(version);
}

Commando.prototype = {

	config: function() {
		return {
			"alias" : process.env.COMMANDO_ALIAS || "your-account-alias",
			"secret" : process.env.COMMANDO_SECRET || "your-secret-key"
		};
	},

	servers: {
		list: function(serverId){ return "servers"; },
		retrieve: function(serverId){ return serverId; },
	},

	about: function(callback) {
		//var auth = config().alias + ":" + config().secret;
		var auth = process.env.COMMANDO_ALIAS + ":" + process.env.COMMANDO_SECRET;
		var options = {
			host: Commando.DEFAULT_HOST,
			port: 443,
			path: '/v1',
			auth: auth,
			method: 'GET'
		};
		var request = https.request( options, callback);
		request.end();
	},

	escape: function(html) {
		return String(html)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
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