var name = "张三";

function showName(){
    console.log(name); // undefined
    if(false){
        var name = "李四";
        // 在编译阶段，不管if语句是否执行，都会将变量声明提升到函数顶部
        // 在执行阶段，if语句进不去，所以赋值不会执行
    }
    console.log(name); // undefined
}

showName();