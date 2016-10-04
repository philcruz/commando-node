'use strict';

var https = require('https');

function Servers(commando) {
	this.commando = commando;
	this.options = {
		host: commando.getApiField('host'),
		port: commando.getApiField('port'),
		auth: commando.getApiField('auth')
	};

}

Servers.prototype = {

	list: function(callback) {
		var options = {
			method: 'GET',
			path: '/v1/servers'
		};
		Object.assign(options, this.options);
		this.commando._makeRequest(options, callback);
	},

	retrieve: function(Id, callback) {
		var options = {
			method: 'GET',
			path: `/v1/servers/${Id}`
		};
		Object.assign(options, this.options);
		this.commando._makeRequest(options, callback);
	},


 };

 module.exports = Servers;