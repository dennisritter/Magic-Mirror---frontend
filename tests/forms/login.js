'use strict'

describe('Controller : FormCtrl', function (){
    //Load the required controller before every test
    beforeEach(module('perna'));

    var FormCtrl, scope;

    beforeEach(inject(function($controller, $scope){
        scope = $rootScope.new();
        FormCtrl = $controller('FormCtrl', {
            $scope : scope
        });
    }));

    it('should login', function(){
        input('email').enter('themagister94@gmail.com');
        input('password').enter('Porschegt');
        element('submit').click();
        expect(browser().location().path()).toBe("/dashboard");
    });
});
