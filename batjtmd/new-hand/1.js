function add() {
    // let result = 0;
    // for(let i = 0; i < arguments.length; i++){
    //     result += arguments[i];
    // }
    // // console.log(arguments.__proto__); // [Object: null prototype] {}
    // console.log([1, 2, 3].__proto__); // Object(0) []
    // return result;
    // arguments 是类数组对象，不能直接使用数组的方法，报错
    // return arguments.reduce((pre, cur) => pre + cur, 0);

    // console.log(JSON.stringify(arguments)); // {"0":1,"1":2}
    // console.log(JSON.stringify([1, 2, 3])); // [1,2,3]


    const args = [...arguments];
    console.log(args, Object.prototype.toString.call(args), args instanceof Array); // [ 1, 2 ] [object Array] true
}

console.log(add(1, 2));

console.log([1, 2, 3, 4, 5, 6].reduce((pre, cur) => pre + cur, 0));