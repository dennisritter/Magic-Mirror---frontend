angular.module('perna').service('ValidationService', [
    function () {

    /**
     * Checks whether the form is valid or not.
     * Marks all inputs in the form as dirty and touched if the form is not valid.
     * @param     {object}  form      The form object
     * @returns   {boolean}           Whether the form is valid or not
     */
    var validateForm = function ( form ) {
        if ( !form.$valid ) {
            forEachControl( form, function ( input ) {
                input.$setDirty();
                input.$setTouched();
            } );
        }
        return form.$valid;
    };

    /**
     * Marks all inputs in the form as pristine and untouched
     * @param     {object}  form      The form object
     * @returns   {object}            The form object
     */
    var resetValidation = function ( form ) {
        forEachControl( form, function ( input ) {
            input.$setPristine();
            input.$setUntouched();
        } );

        return form;
    };

    /**
     * Calls the specified callback for each input in the form
     * @param     {object}    form      The form object for whose inputs to call the callback
     * @param     {function}  loopBody  The function to call for each input. May accept the input as first parameter
     * @returns   {object}              The form object
     */
    var forEachControl = function ( form, loopBody ) {
        for ( var key in form ) {
            if ( !form.hasOwnProperty( key ) || typeof form[key] !== 'object' || !form[key].hasOwnProperty('$modelValue') )
                continue;

            loopBody( form[key] );
        }

        return form;
    };

    return {
        validateForm: validateForm,
        resetValidation: resetValidation,
        forEachControl: forEachControl
    };
}]);
