/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

 // If undefined in our process load our local file
 // (i.e. we aren't on an external server where we set these differently)
 if(!process.env.FOO) {
	 var env = require('./config.js')
 }


module.exports = {

	config: function() {
		return {
			"alias" : process.env.COMMANDO_ALIAS || "your-account-alias",
			"secret" : process.env.COMMANDO_SECRET || "your-secret-key"
		};
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