var should = require('chai').should(),
		commando = require('../index'),
		config = commando.config,
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

describe('#unescape', function() {
	it('converts &amp; into &', function() {
		unescape('&amp;').should.equal('&');
	});

	it('converts &quot; into "', function() {
		unescape('&quot;').should.equal('"');
	});

	it('converts &#39; into single-quote ', function() {
		unescape('&#39;').should.equal("'");
	});

	it('converts &lt; into <', function() {
		unescape('&lt;').should.equal('<');
	});

	it('converts &gt; into >', function() {
		unescape('&gt;').should.equal('>');
	});
});