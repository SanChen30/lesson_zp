function reverseStr(str){
    // 递归出口
    if(str.length === 1){
        return str;
    }
    // 递归调用
    return reverseStr(str.slice(1)) + str.charAt(0);
}

console.log(reverseStr('hello world'));