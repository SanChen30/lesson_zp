let myName = 'zhangsan';
console.log('hello, i am ' + myName);

// ${myName} 插值表达式
console.log(`hello, i am ${myName}`);
console.log(`hello, i am ${myName.toUpperCase()}`);

for(let x of myName){
    console.log(x);
}
