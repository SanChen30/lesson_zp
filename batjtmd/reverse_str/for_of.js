function reverseStr(str){
    let reverse = '';
    for(const char of str){
        reverse = char + reverse;
    }
    return reverse;
}

console.log(reverseStr('hello')); 