function foo(...args) {
    console.log(args, typeof args); // [ 1, 2, 3, 4 ] object
    console.log(Array.isArray(args)); //true
    console.log(arguments, typeof arguments); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 } object
    console.log(Array.isArray(arguments)); //false
}


foo(1, 2, 3, 4);