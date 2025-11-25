/**
 * Modal组件 - 可重用的模态框组件
 * 支持自定义标题、内容和按钮
 */

class ModalComponent {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.isOpen = false;
        this.initialize();
    }

    /**
     * 初始化Modal元素
     */
    initialize() {
        // 创建遮罩层
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        `;
        
        // 创建模态框容器
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.style.cssText = `
            background-color: white;
            border-radius: var(--border-radius, 8px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        `;
        
        // 创建模态框头部
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.style.cssText = `
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        this.modalTitle = document.createElement('h3');
        this.modalTitle.style.margin = 0;
        this.modalTitle.style.fontSize = '1.2rem';
        this.modalTitle.textContent = '模态框标题';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        `;
        
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#f5f5f5';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = 'transparent';
        });
        
        closeButton.addEventListener('click', () => {
            this.close();
        });
        
        modalHeader.appendChild(this.modalTitle);
        modalHeader.appendChild(closeButton);
        
        // 创建模态框内容区域
        this.modalContent = document.createElement('div');
        this.modalContent.className = 'modal-content';
        this.modalContent.style.cssText = `
            padding: 20px;
        `;
        
        // 创建模态框底部
        this.modalFooter = document.createElement('div');
        this.modalFooter.className = 'modal-footer';
        this.modalFooter.style.cssText = `
            padding: 15px 20px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        `;
        
        // 组装模态框
        this.modal.appendChild(modalHeader);
        this.modal.appendChild(this.modalContent);
        this.modal.appendChild(this.modalFooter);
        this.overlay.appendChild(this.modal);
        
        // 添加到文档
        document.body.appendChild(this.overlay);
        
        // 点击遮罩层关闭模态框
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        // 按ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * 打开模态框
     * @param {Object} options - 配置选项
     * @param {string} options.title - 模态框标题
     * @param {string|HTMLElement} options.content - 模态框内容
     * @param {Array} options.buttons - 按钮配置数组
     * @param {boolean} options.closeOnOverlayClick - 点击遮罩层是否关闭
     */
    open(options = {}) {
        // 设置标题
        if (options.title) {
            this.modalTitle.textContent = options.title;
        }
        
        // 设置内容
        this.modalContent.innerHTML = '';
        if (options.content) {
            if (typeof options.content === 'string') {
                this.modalContent.innerHTML = options.content;
            } else if (options.content instanceof HTMLElement) {
                this.modalContent.appendChild(options.content);
            }
        }
        
        // 设置按钮
        this.modalFooter.innerHTML = '';
        if (options.buttons && Array.isArray(options.buttons)) {
            options.buttons.forEach(buttonConfig => {
                const button = document.createElement('button');
                button.textContent = buttonConfig.text || '按钮';
                
                // 设置样式
                button.style.cssText = `
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.2s ease;
                `;
                
                // 设置按钮类型样式
                if (buttonConfig.type === 'primary') {
                    button.style.backgroundColor = 'var(--primary-color, #3498db)';
                    button.style.color = 'white';
                } else {
                    button.style.backgroundColor = '#f5f5f5';
                    button.style.color = '#333';
                }
                
                // 添加点击事件
                if (buttonConfig.onClick) {
                    button.addEventListener('click', () => {
                        buttonConfig.onClick();
                        if (buttonConfig.close !== false) {
                            this.close();
                        }
                    });
                } else {
                    button.addEventListener('click', () => {
                        this.close();
                    });
                }
                
                this.modalFooter.appendChild(button);
            });
        }
        
        // 显示模态框
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        this.modal.style.transform = 'scale(1)';
        this.modal.style.opacity = '1';
        this.isOpen = true;
        
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
    }

    /**
     * 关闭模态框
     */
    close() {
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        this.modal.style.transform = 'scale(0.9)';
        this.modal.style.opacity = '0';
        
        // 恢复背景滚动
        document.body.style.overflow = '';
        
        // 延迟设置状态，等待动画完成
        setTimeout(() => {
            this.isOpen = false;
        }, 300);
    }

    /**
     * 显示确认对话框
     * @param {string} message - 确认消息
     * @param {Function} onConfirm - 确认回调
     * @param {Function} onCancel - 取消回调
     */
    confirm(message, onConfirm, onCancel) {
        this.open({
            title: '确认',
            content: message,
            buttons: [
                {
                    text: '取消',
                    onClick: onCancel
                },
                {
                    text: '确认',
                    type: 'primary',
                    onClick: onConfirm
                }
            ]
        });
    }

    /**
     * 显示提示对话框
     * @param {string} title - 标题
     * @param {string} message - 提示消息
     */
    alert(title, message) {
        this.open({
            title: title,
            content: message,
            buttons: [
                {
                    text: '确定',
                    type: 'primary'
                }
            ]
        });
    }
}

// 导出单例
export const Modal = new ModalComponent();

// 全局使用示例：
// Modal.open({
//     title: '示例模态框',
//     content: '<p>这是模态框的内容</p>',
//     buttons: [
//         {
//             text: '取消',
//             onClick: () => console.log('取消')
//         },
//         {
//             text: '确定',
//             type: 'primary',
//             onClick: () => console.log('确定')
//         }
//     ]
// });

// 确认对话框示例：
// Modal.confirm(
//     '确定要删除这个项目吗？',
//     () => console.log('已确认删除'),
//     () => console.log('已取消删除')
// );