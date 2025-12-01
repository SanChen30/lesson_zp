// Cat，开发约定，首字母大写为类
// name 和 color 只是模板，模板是抽象的，封装的特性在显现
var Cat = {
    name:"",
    color:""
}

var cat1 = {}; // 空对象
cat1.name = '小白';
cat1.color = '白色';

var cat2 = {};
cat2.name = '小黄';
cat2.color = '黄色';

// 比较麻烦（函数封装实例化的过程），而且没什么关系（
// _proto_
// prototype
// constructor
// ）

