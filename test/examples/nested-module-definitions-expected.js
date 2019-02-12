import a from 'a';

var nestedFunction = function() {
    import(a.pathName).then(function(path) {
        // do something with path
    });
}
