const arr = [1, 2, 3, 4, 5, 6];

console.log(arr.map(item => item * item));

console.log(parseInt("108")); // 108

console.log(parseInt(3.1415)); // 3

console.log(parseInt("a")); // NaN

console.log(parseInt(null)); // NaN 

console.log(parseInt(undefined)); // NaN

console.log(parseInt(true)); // NaN

console.log(parseInt("100A")); // 100

console.log(parseInt("ff", 16)); //255
