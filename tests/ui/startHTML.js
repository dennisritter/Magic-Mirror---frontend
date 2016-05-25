casper.test.begin('Test structure of start.html', 5, function suite(test){
    casper.start("http://perna.dev/", function() {
        test.assertTitle('perna. smart - mirror - cloud', 'The title exists, page has sucessfully loaded');
        test.assertExists('#panel-element-login', 'The login element exists');
        test.assertExists('#loginForm', 'The login form has loaded');
        test.assertExists('#panel-element-registration', 'The registration element exists');
    });

    casper.then(function(){
        this.click('#panel-element-registration')
        test.assertExists('#registrationForm', 'After clicking, the registration form is now visible');
    });
    casper.run(function() {
        test.done();
    });
});
