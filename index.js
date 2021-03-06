/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

 process.env['API_HOST'] = 'api.commando.io'

 // If undefined in our process load our local file
 // (i.e. we aren't on an external server where we set these differently)
 if(!process.env.COMMANDO_ALIAS) {
	 var env = require('./config.js')
 }

var https = require('https');

module.exports = {

	config: function() {
		return {
			"alias" : process.env.COMMANDO_ALIAS || "your-account-alias",
			"secret" : process.env.COMMANDO_SECRET || "your-secret-key"
		};
	},

	about: function(callback) {
		console.log('about():');
		//var auth = config().alias + ":" + config().secret;
		var auth = process.env.COMMANDO_ALIAS + ":" + process.env.COMMANDO_SECRET;
		console.log(auth);
		var options = {
			host: process.env.API_HOST,//'api.commando.io',//'api.ipify.org',
			port: 443,
			path: '/v1',//'/?format=json',
			auth: auth,
			method: 'GET'
		};
		var request = https.request( options, callback);
		request.end();
		/*return {
			"version" : "v1",
			"description" : "Commando.io API"
		};*/
	},

	escape: function(html) {
		return String(html)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	},

	/**
	 * Unescape special characters in the given string of html.
	 *
	 * @param  {String} html
	 * @return {String}
	 */
	unescape: function(html) {
		return String(html)
			.replace(/&amp;/g, '&')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>');
	}
};