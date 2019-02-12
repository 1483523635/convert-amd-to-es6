define([
    'some/path/to/a',
    'some/path/to/b',
    'some/path/to/c'
], function (varNameForA, varNameForB) {

    // do something with dep A
    varNameForA();

    // do something with dep B
    varNameForB();

    var simpleExport = "something";

    return {
        init: function() {
            // do something in init
        },
        init2: function() {
            // do something in init2
        },
        simpleExport: simpleExport
    }

});
