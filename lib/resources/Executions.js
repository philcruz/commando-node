'use strict';

var https = require('https');

function Executions(commando) {
	this.commando = commando;
	this.options = {
		host: commando.getApiField('host'),
		port: commando.getApiField('port'),
		auth: commando.getApiField('auth')
	};

}

Executions.prototype = {

	retrieve: function(Id, callback) {
		var options = {
			method: 'GET',
			path: '/v1/executions' + '/' + Id
		};
		Object.assign(options, this.options);
		var request = https.request( options, callback);
		request.end();
	},


 };

 module.exports = Executions;