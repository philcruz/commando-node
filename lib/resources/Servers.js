'use strict';

//var StripeResource = require('../StripeResource');
//var stripeMethod = StripeResource.method;
//var utils = require('../utils');
var https = require('https');

function Servers(commando) {

	var commando = commando;
	this.commando = commando;
}

Servers.prototype = {


	list: function() {
		var host = this.commando.getApiField('host');
		return host;
	},

	about: function(callback) {
		var options = {
			host: this.commando.getApiField('host'),
			port: this.commando.getApiField('port'),
			auth: this.commando.getApiField('auth'),
			method: 'GET',
			path: '/v1'
		};
		var request = https.request( options, callback);
		request.end();
	},



	retrieve: function(id) {
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
	},


 };

 module.exports = Servers;