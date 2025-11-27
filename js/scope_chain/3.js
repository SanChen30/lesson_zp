// 特殊的地方
function foo(){
    var myName = '极客时间';
    let test1 = 1;
    const test2 = 2;
    var innerBar = {
        getName:function(){
            console.log(test1);
            return myName;
        },
        setName:function(newName){
            myName = newName;
        }
    }
    // 因为 return 所以可以被外部访问
    return innerBar; // 闭包形成的条件是函数嵌套函数
}

var bar =foo(); // 出栈
// bar 里面的变量垃圾回收? 不会回收 
bar.setName('极客邦'); // setName 执行上下文创建
bar.getName();
console.log(bar.getName()); // 极客邦