/**
 * @func EditInPlace 就地编辑
 * @params {string} value 初始值
 * @params {element} parentElement 挂载点
 * @params {string} id 自身ID
 */
function EditInPlace(id, value, parentElement) {
    // {} 空对象，this 指向它
    this.id = id;
    this.value = value || '这个家伙很懒，什么都没有留下';
    this.parentElement = parentElement;
    this.containerElement = null; // 空指针
    this.staticElement = null; // span
    this.fieldElement = null; // input
    this.saveButton = null; // 保存
    this.cancelButton = null; // 取消

    // 代码比较多，按功能分模块，拆函数
    this.createElement(); // DOM 对象创建
    this.attachEvent(); // 事件添加
}
EditInPlace.prototype = {
    // 封装了DOM操作
    createElement: function(){
        // DOM 操作
        this.containerElement = document.createElement('div');
        // console.log(this.containerElement,
        //     // 获取元素的类型
        //     Object.prototype.toString.call(this.containerElement));
        this.containerElement.id = this.id;
        this.parentElement.appendChild(this.containerElement);

        // 值
        this.staticElement = document.createElement('span');
        this.staticElement.innerHTML = this.value;
        this.containerElement.appendChild(this.staticElement);

        // 输入框
        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        // 保存按钮
        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = '保存';
        this.containerElement.appendChild(this.saveButton);

        // 取消按钮
        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = '取消';
        this.containerElement.appendChild(this.cancelButton);
        
        this.convertToText(); // 切换到文本显示状态
    },
    convertToText: function(){
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';
    },
    convertToField: function(){
        this.fieldElement.value = this.value;
        this.fieldElement.style.display = 'inline';
        this.staticElement.style.display = 'none';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';
    },
    attachEvent: function(){
        this.staticElement.addEventListener('click', () => {
            this.convertToField(); // 切换到输入框状态
        });
        this.saveButton.addEventListener('click', () => {
            this.save();
        });
        this.cancelButton.addEventListener('click', () => {
            this.cancel();
        });
    },
    save: function(){
        var value = this.fieldElement.value;
        // fetch 后端存储
        this.value = value;
        this.staticElement.innerHTML = value;
        this.convertToText();
    },
    cancel: function(){
        this.convertToText();
    }

}