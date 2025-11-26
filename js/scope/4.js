let name = "张三";

function showName(){
    console.log(name); // 张三
    if(false){
        let name = "李四";
        // let 支持块级作用域，不会进行变量提升
    }
}

showName();