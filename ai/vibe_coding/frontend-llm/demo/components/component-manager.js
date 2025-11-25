/**
 * 组件管理器 - 负责加载和初始化所有自定义组件
 * 提供组件注册和使用的统一接口
 */

class ComponentManager {
    constructor() {
        this.components = {};
        this.isInitialized = false;
    }

    /**
     * 初始化组件管理器
     * 动态导入所需的组件
     */
    async initialize() {
        if (this.isInitialized) return;

        try {
            // 动态导入组件
            const { Alert } = await import('./alert.js');
            const { Modal } = await import('./modal.js');

            // 注册组件
            this.register('alert', Alert);
            this.register('modal', Modal);

            this.isInitialized = true;
            console.log('组件管理器初始化完成');

            // 初始化组件演示
            this.setupComponentDemos();
        } catch (error) {
            console.error('组件初始化失败:', error);
        }
    }

    /**
     * 注册组件
     * @param {string} name - 组件名称
     * @param {Object} component - 组件实例
     */
    register(name, component) {
        this.components[name] = component;
    }

    /**
     * 获取组件
     * @param {string} name - 组件名称
     * @returns {Object} 组件实例
     */
    get(name) {
        return this.components[name];
    }

    /**
     * 设置组件演示
     */
    setupComponentDemos() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createDemoUI());
        } else {
            this.createDemoUI();
        }
    }

    /**
     * 创建演示UI
     */
    createDemoUI() {
        const componentContainer = document.getElementById('component-container');
        if (!componentContainer) return;

        // 创建组件演示区域
        const demoSection = document.createElement('div');
        demoSection.className = 'mt-4';
        demoSection.innerHTML = `
            <h3>组件演示</h3>
            <div class="card">
                <div class="card-header">组件交互演示</div>
                <div class="card-body">
                    <p>点击下面的按钮来测试不同的组件功能：</p>
                    <div class="demo-buttons" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px;">
                        <button id="show-alert-success" class="primary-btn">显示成功提示</button>
                        <button id="show-alert-error" class="primary-btn">显示错误提示</button>
                        <button id="show-modal" class="primary-btn">显示模态框</button>
                        <button id="show-confirm" class="primary-btn">显示确认框</button>
                    </div>
                </div>
            </div>
        `;

        componentContainer.appendChild(demoSection);

        // 添加事件监听器
        this.addEventListeners();
    }

    /**
     * 添加事件监听器
     */
    addEventListeners() {
        const alert = this.get('alert');
        const modal = this.get('modal');

        // 显示成功提示
        document.getElementById('show-alert-success')?.addEventListener('click', () => {
            if (alert) {
                alert.success('操作成功！这是一个成功提示。');
            }
        });

        // 显示错误提示
        document.getElementById('show-alert-error')?.addEventListener('click', () => {
            if (alert) {
                alert.error('操作失败！这是一个错误提示。');
            }
        });

        // 显示模态框
        document.getElementById('show-modal')?.addEventListener('click', () => {
            if (modal) {
                modal.open({
                    title: '示例模态框',
                    content: `
                        <p>这是一个可重用的模态框组件。</p>
                        <p>它支持自定义标题、内容和按钮。</p>
                        <div style="margin-top: 15px;">
                            <input type="text" placeholder="请输入一些内容" 
                                   style="padding: 8px; width: 100%; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                    `,
                    buttons: [
                        {
                            text: '取消',
                            onClick: () => console.log('用户点击了取消')
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            onClick: () => {
                                console.log('用户点击了确定');
                                if (alert) {
                                    alert.success('模态框操作已确认！');
                                }
                            }
                        }
                    ]
                });
            }
        });

        // 显示确认框
        document.getElementById('show-confirm')?.addEventListener('click', () => {
            if (modal && alert) {
                modal.confirm(
                    '确定要执行此操作吗？',
                    () => {
                        console.log('用户确认了操作');
                        alert.success('操作已确认执行！');
                    },
                    () => {
                        console.log('用户取消了操作');
                        alert.info('操作已取消');
                    }
                );
            }
        });
    }

    /**
     * 动态加载组件示例
     * @param {string} componentName - 组件名称
     * @param {HTMLElement} targetElement - 目标元素
     */
    loadComponentExample(componentName, targetElement) {
        const componentExamples = {
            'card': this.createCardExample,
            'form': this.createFormExample,
            'tabs': this.createTabsExample
        };

        const exampleFunction = componentExamples[componentName];
        if (exampleFunction && typeof exampleFunction === 'function') {
            const example = exampleFunction.call(this);
            if (targetElement) {
                targetElement.appendChild(example);
            }
            return example;
        }
        return null;
    }

    /**
     * 创建卡片示例
     */
    createCardExample() {
        const container = document.createElement('div');
        container.className = 'mt-3';
        container.innerHTML = `
            <div class="card">
                <div class="card-header">卡片示例</div>
                <div class="card-body">
                    <h4>卡片标题</h4>
                    <p>这是一个卡片组件的示例内容。卡片组件常用于展示独立的信息块。</p>
                    <div class="mt-2">
                        <button class="primary-btn">了解更多</button>
                    </div>
                </div>
            </div>
        `;
        return container;
    }

    /**
     * 创建表单示例
     */
    createFormExample() {
        const container = document.createElement('div');
        container.className = 'mt-3';
        container.innerHTML = `
            <div class="card">
                <div class="card-header">表单示例</div>
                <div class="card-body">
                    <form id="example-demo-form">
                        <div class="form-group">
                            <label>姓名</label>
                            <input type="text" placeholder="请输入姓名">
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input type="email" placeholder="请输入邮箱">
                        </div>
                        <div class="form-group">
                            <label>留言</label>
                            <textarea rows="3" placeholder="请输入留言内容"></textarea>
                        </div>
                        <button type="submit" class="primary-btn">提交</button>
                    </form>
                </div>
            </div>
        `;

        // 添加表单提交事件
        const form = container.querySelector('#example-demo-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const alert = this.get('alert');
            if (alert) {
                alert.success('表单提交成功！这是一个演示。');
            }
            form.reset();
        });

        return container;
    }

    /**
     * 创建标签页示例
     */
    createTabsExample() {
        const container = document.createElement('div');
        container.className = 'mt-3';
        container.innerHTML = `
            <div class="card">
                <div class="card-header">标签页示例</div>
                <div class="card-body">
                    <div class="tabs">
                        <div class="tab-buttons" style="display: flex; border-bottom: 1px solid #ddd;">
                            <button class="tab-btn active" data-tab="tab1">标签一</button>
                            <button class="tab-btn" data-tab="tab2">标签二</button>
                            <button class="tab-btn" data-tab="tab3">标签三</button>
                        </div>
                        <div class="tab-content">
                            <div id="tab1" class="tab-pane active">
                                <h4>标签一内容</h4>
                                <p>这是标签页一的内容区域，可以放置任何HTML内容。</p>
                            </div>
                            <div id="tab2" class="tab-pane">
                                <h4>标签二内容</h4>
                                <p>这是标签页二的内容区域，展示了标签页组件的多页面切换功能。</p>
                            </div>
                            <div id="tab3" class="tab-pane">
                                <h4>标签三内容</h4>
                                <p>这是标签页三的内容区域，每个标签页可以包含不同的信息。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 添加标签页样式
        const style = document.createElement('style');
        style.textContent = `
            .tab-buttons .tab-btn {
                padding: 10px 20px;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 14px;
                border-bottom: 2px solid transparent;
                transition: all 0.2s ease;
            }
            .tab-buttons .tab-btn.active {
                border-bottom-color: var(--primary-color, #3498db);
                color: var(--primary-color, #3498db);
            }
            .tab-pane {
                display: none;
                padding: 20px 0;
            }
            .tab-pane.active {
                display: block;
            }
        `;
        container.appendChild(style);

        // 添加标签页切换功能
        const tabButtons = container.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // 更新按钮状态
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // 更新内容显示
                const tabPanes = container.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                const activePane = container.getElementById(tabId);
                if (activePane) {
                    activePane.classList.add('active');
                }
            });
        });

        return container;
    }
}

// 导出单例
export const componentManager = new ComponentManager();

// 导出初始化函数，方便在主应用中调用
export function initializeComponents() {
    return componentManager.initialize();
}

// 全局使用示例：
// import { initializeComponents } from './components/component-manager.js';
// 
// document.addEventListener('DOMContentLoaded', () => {
//     initializeComponents();
// });