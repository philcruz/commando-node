
'use strict';

Commando.DEFAULT_HOST = 'api.commando.io';
Commando.DEFAULT_PORT = 443;
Commando.DEFAULT_BASE_PATH = '/v1';
Commando.DEFAULT_TIMEOUT = 60;

var https = require('https');

var resources = {
	Servers: require('./resources/Servers'),
	Groups: require('./resources/Groups'),
	Recipes: require('./resources/Recipes'),
	ExecutionQueue: require('./resources/ExecutionQueue'),
	Executions: require('./resources/Executions')
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
		this._makeRequest(options, callback);
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
			this[ name[0].toLowerCase() + name.substring(1) ] = new resources[name](this);
		}
	},

	_makeRequest: function( options, callback ) {
		var req = https.request(options, function(res) {
			var body = '';
			res.on('data', function(chunk){
				body += chunk;
			});

			res.on('end', function(){
				//console.log(body);
				var data = JSON.parse(body);
				//console.log(data);
				callback(data);
			});

		});
		req.end();
	},


};

module.exports = Commando;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Commando = Commando;