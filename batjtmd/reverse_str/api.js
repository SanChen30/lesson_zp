function reverseStr(str){
    // 数组可以反转
    // 字符串反转: 字符串变数组，数组反转，再变回字符串
    return str.split('').reverse().join('');
}

console.log(reverseStr('hello'));