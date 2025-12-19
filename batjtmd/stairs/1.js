// 解法一：递归（暴力，不推荐）
function climbStairs(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;
    return climbStairs(n - 1) + climbStairs(n - 2);
}

// 解法二：记忆化递归（优化版递归）
// 太多重复计算，调用栈的内存会爆栈
// 空间换时间 memo
const memo = {};
function climbStairs(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (memo[n]) return memo[n];
    memo[n] = climbStairs(n - 1) + climbStairs(n - 2);
    return memo[n];
}

// 外层函数创建闭包环境，私有化memo
const climbStairs = (function () {
    // 缓存对象，被闭包持有，多次调用不会重置
    const memo = {};

    // 内层函数实现核心逻辑，访问外层的memo
    return function climb(n) {
        // 边界条件
        if (n === 1) return 1;
        if (n === 2) return 2;

        // 优先读取缓存，避免重复递归计算
        if (memo[n]) return memo[n];

        // 递归计算并缓存结果
        memo[n] = climb(n - 1) + climb(n - 2);
        return memo[n];
    };
})();

// 解法三：动态规划
// 自底向上思考
// f(1) = 1
// f(2) = 2
// f(3) = f(2) + f(1) = 2 + 1 = 3
// f(4) = f(3) + f(2) = 3 + 2 = 5
function climbStairs(n) {
  if (n <= 1) return 1;
  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 解法四：空间优化（滚动变量）
// 注意到 dp[i] 只依赖前两个值，所以只需两个变量：
function climbStairs(n) {
    if(n === 1) return 1;
    if(n === 2) return 2;
    let prePrev = 1;
    let prev = 2;
    let current;
    for(let i = 3; i <= n; i++){
        current = prev + prePrev;
        prePrev = prev;
        prev = current;
    }
    return current;
}