function add(a, b) {
    // js 弱类型优势，好学，简单易上手
    // js 是弱类型的，容易出错
    // 大型项目的时候，因为弱类型带来的代码质量问题
    // js 是动态语言，运行时才发生bug
    // typescript 是 js 的超集，强类型（类型限定），静态语言（编译时不通过）
    // 加法，拼接字符串
    return a + b; // 二义性
}

const result = add(10, '5');