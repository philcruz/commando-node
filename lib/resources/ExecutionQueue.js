'use strict';

var https = require('https');

function ExecutionQueue(commando) {
	this.commando = commando;
	this.options = {
		host: commando.getApiField('host'),
		port: commando.getApiField('port'),
		auth: commando.getApiField('auth')
	};

}

ExecutionQueue.prototype = {

	list: function(callback) {
		var options = {
			method: 'GET',
			path: '/v1/execution-queue'
		};
		Object.assign(options, this.options);
		var request = https.request( options, callback);
		request.end();
	},

	retrieve: function(Id, callback) {
		var options = {
			method: 'GET',
			path: '/v1/execution-queue' + '/' + Id
		};
		Object.assign(options, this.options);
		var request = https.request( options, callback);
		request.end();
	},


 };

 module.exports = ExecutionQueue;