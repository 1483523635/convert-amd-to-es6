define(['a'], function(a) {

    var nestedFunction = function() {
        require([a.pathName], function(path) {
            // do something with path
        });
    }
});
