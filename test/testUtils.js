'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
//require('chai').use(require('chai-as-promised'));

var utils = module.exports = {

	getAlias: function() {
		var alias = process.env.COMMANDO_ALIAS || "your-account-alias";
		return alias;
	},

	getSecret: function() {
		var secret = process.env.COMMANDO_SECRET || "your-secret-key";
		return secret;
	},




};
