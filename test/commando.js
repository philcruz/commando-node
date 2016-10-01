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

	it('should get the servers', function(done) {
		assert.doesNotThrow(function() {
			commando.servers.list(function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.length, 2);
					done();
				});

			}, done);
		});
	});

	it('should get the servers about', function(done) {
		assert.doesNotThrow(function() {
			commando.servers.about(function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.version,'v1');
					done();
				});

			}, done);
		});
	});

	it('gets the server info', function() {
		commando.servers.list('foo').should.equal('api.commando.io');
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


