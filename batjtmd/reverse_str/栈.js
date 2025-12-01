function reverseStr(str) {
  const stack = [];
  // 入栈
  for (let char of str) {
    stack.push(char);
  }
  // 出栈（后进先出）
  let reversed = '';
  while (stack.length > 0) {
    reversed += stack.pop();
  }
  return reversed;
}

console.log(reverseStr("hello")); // "olleh"
