var casper = require('casper').create();

casper.test

casper.test.begin('The heading exists', 1, function suite(test) {
    casper.start('http://domain.tld/page.html', function() {
        test.assertExists('h1.page-title');
    }).run(function() {
        test.done();
    });
});
