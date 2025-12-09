function foo() {
    var a = {name:"极客时间"} // 引用式赋值
    var b = a; // 引用式拷贝
    a.name = "极客邦";
    console.log(a, b); // {name:"极客邦"} {name:"极客邦"}
}
foo();