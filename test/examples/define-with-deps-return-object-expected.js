import varNameForA from 'some/path/to/a';
import varNameForB from 'some/path/to/b';
import 'some/path/to/c';

// do something with dep A
varNameForA();

// do something with dep B
varNameForB();

var simpleExport = "something";

export function init() {
    // do something in init
}
export function init2() {
    // do something in init2
}
export {
    simpleExport
};
