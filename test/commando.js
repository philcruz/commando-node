'use strict';

var testUtils = require('./testUtils');
var should = require('chai').should();
var	assert = require('chai').assert;
var	commando = require('../lib/commando')(testUtils.getAlias(), testUtils.getSecret());

describe('#config', function() {
	it('gets the alias', function() {
		commando.config().alias.should.equal(process.env.COMMANDO_ALIAS || 'your-account-alias');
	});

	it('gets the secret', function() {
		commando.config().secret.should.equal(process.env.COMMANDO_SECRET ||'your-secret-key');
	});

});

describe('#servers', function() {


	it('should get the all servers', function(done) {
		assert.doesNotThrow(function() {
			commando.servers.list(function(data) {
				//console.log(data)
				assert.equal(data.length, 2);
				done();
			});
		});
	});

	it('should get a server by id', function(done) {
		assert.doesNotThrow(function() {
			commando.servers.retrieve('srv_2vhZl57daf0e630261sHn', function(data) {
				//console.log(data);
				assert.equal(data.label, "WEB1");
				done();
			});
		});
	});

});

describe('#groups', function() {

	it('should get all groups', function(done) {
		assert.doesNotThrow(function() {
			commando.groups.list(function(data) {
				assert.equal(data.length,1);
				done();
			});
		});
	});

	it('should get a group by id', function(done) {
		assert.doesNotThrow(function() {
			commando.groups.retrieve('grp_GDI6t57daf0b5ae5dd168', function(data) {
				assert.equal(data.name,'PROD');
				done();
			});
		});
	});

});

describe('#recipes', function() {

	it('should get all recipes', function(done) {
		assert.doesNotThrow(function() {
			commando.recipes.list(function(data) {
				assert.equal(data.length, 8);
				done();
			});
		});
	});

	it('should get a recipe by id', function(done) {
		assert.doesNotThrow(function() {
			commando.recipes.retrieve('rec_7hgCk57db09ddc13f0gbx', function(data) {
				assert.equal(data.name,'RESTART-CF');
				done();
			});
		});
	});

});

describe('#execution-queue', function() {

	it('should get all in the execution-queue', function(done) {
		assert.doesNotThrow(function() {
			commando.executionQueue.list(function(data) {
				assert.equal(data.length, 1);
				done();
			});
		});
	});

	it('should get an execution-queue by id', function(done) {
		assert.doesNotThrow(function() {
			commando.executionQueue.retrieve('57db6511179db941208b456f', function(data) {
				assert.equal(data.url,'/v1/execution-queue/57db6511179db941208b456f');
				done();
			});
		});
	});

});

describe('#executions', function() {

	it('should get an execution by id', function(done) {
		assert.doesNotThrow(function() {
			commando.executionQueue.retrieve('57db6511179db941208b456f', function(data) {
				assert.equal(data.url,'/v1/execution-queue/57db6511179db941208b456f');
				done();
			});
		});
	});

});


describe('#about', function() {

	it('should get the API version', function(done) {
		assert.doesNotThrow(function() {
			commando.about(function(data) {
				//console.log(data)
				assert.equal(data.version, 'v1');
				done();
			});
		});
	});


	/*it('should get the API version', function(done) {
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
	});*/

});


