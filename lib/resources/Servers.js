'use strict';

//var StripeResource = require('../StripeResource');
//var stripeMethod = StripeResource.method;
//var utils = require('../utils');
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
		var request = https.request( options, callback);
		request.end();
	},

	retrieve: function(serverID, callback) {
		var options = {
			method: 'GET',
			path: '/v1/servers' + '/' + serverID
		};
		Object.assign(options, this.options);
		var request = https.request( options, callback);
		request.end();
	},

	/*retrieve: function(id) {
		// No longer allow an api key to be passed as the first string to this function due to ambiguity between
		// old account ids and api keys. To request the account for an api key, send null as the id
		if (typeof id === 'string') {
			return stripeMethod({
				method: 'GET',
				path: 'accounts/{id}',
				urlParams: ['id'],
			}).apply(this, arguments);
		} else {
			if (id === null || id === undefined) {
				// Remove id as stripeMethod would complain of unexpected argument
				[].shift.apply(arguments);
			}
			return stripeMethod({
				method: 'GET',
				path: 'account',
			}).apply(this, arguments);
		}
	},*/


 };

 module.exports = Servers;