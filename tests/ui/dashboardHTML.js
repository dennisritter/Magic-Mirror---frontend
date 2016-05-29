casper.test.begin('Test structure of dashboard.html', 2, function suite(test){
    casper.start("http://perna.dev/", function() {

    });

    casper.then(function(){
        test.assertExists('#grid', 'The grid is loaded');
    });

    casper.then(function(){
        test.assertExists('a[href="/dashboard"]', 'The Usersettingspage has loaded');
    });
})
