'use strict';

var testUtils = require('./testUtils');
var should = require('chai').should();
var	assert = require('chai').assert;
var	commando = require('../lib/commando')(testUtils.getAlias(), testUtils.getSecret());

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
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.length, 2);
					done();
				});

			}, done);
		});
	});

	it('should get the server info', function(done) {
		assert.doesNotThrow(function() {
			commando.servers.retrieve('srv_2vhZl57daf0e630261sHn', function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.label,'WEB1');
					done();
				});

			}, done);
		});
	});

});

describe('#groups', function() {

	it('should get the groups', function(done) {
		assert.doesNotThrow(function() {
			commando.groups.list(function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.length, 1);
					done();
				});

			}, done);
		});
	});

	it('should get the group info', function(done) {
		assert.doesNotThrow(function() {
			commando.groups.retrieve('grp_GDI6t57daf0b5ae5dd168', function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.name,'PROD');
					done();
				});

			}, done);
		});
	});

});

describe('#recipes', function() {

	it('should get the recipes', function(done) {
		assert.doesNotThrow(function() {
			commando.recipes.list(function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.length, 8);
					done();
				});

			}, done);
		});
	});

	it('should get the recipe info', function(done) {
		assert.doesNotThrow(function() {
			commando.recipes.retrieve('rec_7hgCk57db09ddc13f0gbx', function(res) {
				var body = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					//console.log(body);
					var data = JSON.parse(body);
					assert.equal(data.name,'RESTART-CF');
					done();
				});

			}, done);
		});
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


