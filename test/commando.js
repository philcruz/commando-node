var should = require('chai').should(),
		assert = require('chai').assert,
		commando = require('../lib/commando')('key','version'),
		about = commando.about,
		config = commando.config,
		servers = commando.servers,
		escape = commando.escape,
		unescape = commando.unescape;

describe('#config', function() {
	it('gets the default alias', function() {
		config().alias.should.equal(process.env.COMMANDO_ALIAS || 'your-account-alias');
	});

	it('gets the default secret', function() {
		config().secret.should.equal(process.env.COMMANDO_SECRET ||'your-secret-key');
	});

});

describe('#servers', function() {
	it('gets the list of servers', function() {
		servers.list().should.equal('servers');
	});

	it('gets the server info', function() {
		servers.retrieve('foo').should.equal('foo');
	});

});


describe('#about', function() {

	it('should get the API version', function(done) {
		assert.doesNotThrow(function() {
			about(function(res) {
				var body = '';
				var ip = '';
				res.on('data', function(chunk){
					body += chunk;
				});

				res.on('end', function(){
					var data = JSON.parse(body);
					version = data.version;
					assert.equal(version, 'v1');
					done();
				});


			}, done);
		});
	});

});

describe('#escape', function() {
	it('converts & into &amp;', function() {
		escape('&').should.equal('&amp;');
	});

	it('converts " into &quot;', function() {
		escape('"').should.equal('&quot;');
	});

	it('converts single-quote into &#39;', function() {
		escape("'").should.equal('&#39;');
	});

	it('converts < into &lt;', function() {
		escape('<').should.equal('&lt;');
	});

	it('converts > into &gt;', function() {
		escape('>').should.equal('&gt;');
	});
});

