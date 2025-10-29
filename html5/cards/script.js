// dom事件监听
const panels = document.querySelectorAll(".panel");
// console.log(panels,
//     panels[0],
//     typeof panels[0], //object
//     Object.prototype.toString.call(panels[0])); //[object HTMLDivElement]
panels.forEach(function(panel){
    //事件监听需要再具体的元素上
    panel.addEventListener("click",function(){
        //点击当前项添加或删除 active 类名
        panel.classList.toggle("active");
    })
})