'use strict';

var https = require('https');

function Groups(commando) {
	this.commando = commando;
	this.options = {
		host: commando.getApiField('host'),
		port: commando.getApiField('port'),
		auth: commando.getApiField('auth')
	};

}

Groups.prototype = {

	list: function(callback) {
		var options = {
			method: 'GET',
			path: '/v1/groups'
		};
		Object.assign(options, this.options);
		this.commando._makeRequest(options, callback);
	},

	retrieve: function(Id, callback) {
		var options = {
			method: 'GET',
			path: `/v1/groups/${Id}`
		};
		Object.assign(options, this.options);
		this.commando._makeRequest(options, callback);
	},


 };

 module.exports = Groups;