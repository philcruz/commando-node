'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
//require('chai').use(require('chai-as-promised'));

var utils = module.exports = {

	getCommandoSecret: function() {
		var key = process.env.COMMANDO_SECRET || "your-secret-key";
		return key;
	},




};
