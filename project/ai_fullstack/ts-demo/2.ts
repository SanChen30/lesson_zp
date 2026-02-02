// 强类型可以杜绝90%的错误
function addTs(a: number, b: number): number {
    return a + b;
}

// const res = addTs(10, '5'); // 报错
console.log(addTs(10, 5));