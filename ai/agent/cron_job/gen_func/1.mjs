// 生成器函数
function* fruitGenerator() {
    console.log('开始生成水果');
    yield 'apple';
    console.log('生成了苹果，继续生成');
    yield 'banana';
    console.log('生成了香蕉，结束生成');
    return '没有水果了';
}

// 生成器对象，迭代器
const fruitMachine = fruitGenerator();
console.log(fruitMachine.next(), '////');
console.log(fruitMachine.next(), '////');
console.log(fruitMachine.next(), '////');
console.log(fruitMachine.next(), '////');