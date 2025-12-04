// 用一个 map | json 来维护左括号和右括号的对应关系
// 用一个栈来维护左括号，遇到右括号时，弹出栈顶元素，查看是否匹配
// 若不匹配或栈不为空，返回 false，遍历完毕后，栈为空，有效

const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}"
};

const isValid = function(s) {
    if (s.length === 0) return true;
    const stack = []; // 栈
    const len = s.length;
    for(let i =0; i < len; i++){
        const ch = s[i];
        if(ch === "(" || ch === "[" || ch === "{"){
            stack.push(leftToRight[ch]);
        }
        else{
            if(stack.length === 0 || stack.pop()!== ch){
                return false;
            }
        }
    }
    return stack.length === 0;
}