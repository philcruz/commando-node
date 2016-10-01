'use strict';

var testUtils = require('./testUtils');
var should = require('chai').should();
var	assert = require('chai').assert;
var	commando = require('../lib/commando')(testUtils.getAlias(), testUtils.getSecret());
var	escape = commando.escape;
var	unescape = commando.unescape;

describe('#config', function() {
	it('gets the default alias', function() {
		commando.config().alias.should.equal(process.env.COMMANDO_ALIAS || 'your-account-alias');
	});

	it('gets the default secret', function() {
		commando.config().secret.should.equal(process.env.COMMANDO_SECRET ||'your-secret-key');
	});

});

describe('#servers', function() {
	it('gets the list of servers', function() {
		commando.servers.list().should.equal('servers');
	});

	it('gets the server info', function() {
		commando.servers.retrieve('foo').should.equal('foo');
	});

});

describe('#about', function() {

	it('should get the API version', function(done) {
		assert.doesNotThrow(function() {
			commando.about(function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.version, 'v1');
					done();
				});

			}, done);
		});
	});

});


