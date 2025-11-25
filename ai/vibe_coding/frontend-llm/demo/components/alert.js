/**
 * Alert组件 - 可重用的通知提示组件
 * 支持不同类型的通知：success, error, warning, info
 */

class AlertComponent {
    constructor() {
        this.container = null;
        this.initialize();
    }

    /**
     * 初始化Alert容器
     */
    initialize() {
        // 创建Alert容器
        this.container = document.createElement('div');
        this.container.className = 'alert-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(this.container);
    }

    /**
     * 创建Alert元素
     * @param {string} message - 提示消息
     * @param {string} type - 提示类型：success, error, warning, info
     * @param {number} duration - 显示持续时间（毫秒）
     * @returns {HTMLElement} - Alert元素
     */
    createAlert(message, type = 'info', duration = 3000) {
        // 创建Alert元素
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        
        // 设置样式
        const styles = {
            success: {
                backgroundColor: '#d4edda',
                borderColor: '#c3e6cb',
                color: '#155724'
            },
            error: {
                backgroundColor: '#f8d7da',
                borderColor: '#f5c6cb',
                color: '#721c24'
            },
            warning: {
                backgroundColor: '#fff3cd',
                borderColor: '#ffeaa7',
                color: '#856404'
            },
            info: {
                backgroundColor: '#d1ecf1',
                borderColor: '#bee5eb',
                color: '#0c5460'
            }
        };
        
        const style = styles[type] || styles.info;
        
        alert.style.cssText = `
            padding: 15px;
            border-radius: var(--border-radius, 8px);
            background-color: ${style.backgroundColor};
            border: 1px solid ${style.borderColor};
            color: ${style.color};
            box-shadow: var(--shadow, 0 2px 10px rgba(0, 0, 0, 0.1));
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // 添加消息文本
        const messageElement = document.createElement('span');
        messageElement.textContent = message;
        alert.appendChild(messageElement);
        
        // 添加关闭按钮
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: inherit;
            padding: 0;
            margin-left: 10px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        closeButton.addEventListener('click', () => {
            this.removeAlert(alert);
        });
        
        alert.appendChild(closeButton);
        
        // 添加到容器
        this.container.appendChild(alert);
        
        // 设置自动关闭
        if (duration > 0) {
            setTimeout(() => {
                this.removeAlert(alert);
            }, duration);
        }
        
        return alert;
    }

    /**
     * 移除Alert元素
     * @param {HTMLElement} alert - 要移除的Alert元素
     */
    removeAlert(alert) {
        // 添加动画
        alert.style.animation = 'slideOutRight 0.3s ease-in';
        
        // 动画结束后移除
        setTimeout(() => {
            if (alert.parentNode === this.container) {
                this.container.removeChild(alert);
            }
        }, 300);
    }

    /**
     * 显示成功提示
     * @param {string} message - 提示消息
     * @param {number} duration - 显示持续时间（毫秒）
     */
    success(message, duration = 3000) {
        return this.createAlert(message, 'success', duration);
    }

    /**
     * 显示错误提示
     * @param {string} message - 提示消息
     * @param {number} duration - 显示持续时间（毫秒）
     */
    error(message, duration = 3000) {
        return this.createAlert(message, 'error', duration);
    }

    /**
     * 显示警告提示
     * @param {string} message - 提示消息
     * @param {number} duration - 显示持续时间（毫秒）
     */
    warning(message, duration = 3000) {
        return this.createAlert(message, 'warning', duration);
    }

    /**
     * 显示信息提示
     * @param {string} message - 提示消息
     * @param {number} duration - 显示持续时间（毫秒）
     */
    info(message, duration = 3000) {
        return this.createAlert(message, 'info', duration);
    }
}

// 添加动画样式
function addAlertAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化动画
addAlertAnimations();

// 导出单例
export const Alert = new AlertComponent();

// 全局使用示例：
// Alert.success('操作成功！');
// Alert.error('操作失败，请重试。');
// Alert.warning('请注意，这是一个警告。');
// Alert.info('这是一条信息。');