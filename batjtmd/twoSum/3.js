const obj = {
    name: 'zp',
    company: 'bytedance',
}
obj.age = 18;

const o = new Map();
o.set('name','张三');
o.set('company','字节跳动');

console.log(o.get('name'));    // 张三
console.log(o.get('company')); // 字节跳动
console.log(o.get('age'));     // undefined

console.log(o.has('name'));    // true
console.log(o.has('company')); // true
console.log(o.has('age'));     // false

