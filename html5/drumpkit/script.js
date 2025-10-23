// 页面的最底部，在静态页面出现后再执行
// document 整个文档 添加了一个事件监听
// 首要渲染界面，html + css, 不需要 js 参与
// DOMContentLoaded  html文档加载完成后触发
// DOM 文档结构
// script阻塞html的下载
document.addEventListener('DOMContentLoaded', function () {
    // 页面加载完成后执行的代码
    // 可以获取页面元素、添加事件监听器等
    function playSound(event){
        // 事件对象，在事件发生时会给回调函数
        // keyCode 按下的键的编码
        console.log(event.keyCode);
        let keyCode = event.keyCode;
        let element = document.querySelector(`.key[data-key="${keyCode}"]`);
        console.log(element);
        element.classList.add("playing");
    }
    // 事件监听
    window.addEventListener('keydown', playSound);
});