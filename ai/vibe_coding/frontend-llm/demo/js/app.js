/**
 * 通用原生HTML/CSS/JS项目 - JavaScript主文件
 * 包含基本交互功能、DOM操作和示例组件
 */

// 导入组件管理器
import { initializeComponents } from '../components/component-manager.js';

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    initSmoothScroll();
    initFeatureCards();
    loadExampleComponents();
    initButtonInteractions();
    initFormValidation();
    
    // 初始化自定义组件
    initializeComponents().catch(error => {
        console.error('组件初始化失败:', error);
    });
    
    // 显示页面加载完成信息
    console.log('页面加载完成，所有功能已初始化');
});

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    
    // 检查菜单按钮是否存在
    if (!menuToggle) return;
    
    // 创建移动端导航菜单
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'close-menu';
    closeButton.textContent = '×';
    mobileNav.appendChild(closeButton);
    
    // 创建导航链接列表
    const navList = document.createElement('ul');
    const navLinks = ['首页', '功能', '组件', '联系我们'];
    const navIds = ['#', '#features', '#components', '#contact'];
    
    navLinks.forEach((link, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = navIds[index];
        a.textContent = link;
        
        // 点击链接后关闭菜单
        a.addEventListener('click', function(e) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        li.appendChild(a);
        navList.appendChild(li);
    });
    
    mobileNav.appendChild(navList);
    document.body.appendChild(mobileNav);
    
    // 打开菜单
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 关闭菜单
    closeButton.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            e.target !== menuToggle) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 页面滚动监听，添加滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header nav');
        const scrollPosition = window.scrollY;
        
        // 滚动时改变导航栏样式
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 显示/隐藏回到顶部按钮
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (scrollPosition > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        }
    });
    
    // 添加回到顶部按钮
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.textContent = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 99;
        transition: var(--transition);
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTop);
}

/**
 * 初始化功能卡片交互
 */
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // 添加悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * 加载示例组件
 */
function loadExampleComponents() {
    const componentContainer = document.getElementById('component-container');
    if (!componentContainer) return;
    
    // 创建示例卡片组件
    const cardComponent = createCardComponent();
    componentContainer.appendChild(cardComponent);
    
    // 创建示例表单组件
    const formComponent = createFormComponent();
    componentContainer.appendChild(formComponent);
    
    // 创建示例统计组件
    const statsComponent = createStatsComponent();
    componentContainer.appendChild(statsComponent);
}

/**
 * 创建卡片组件
 */
function createCardComponent() {
    const container = document.createElement('div');
    container.className = 'mt-4';
    
    const title = document.createElement('h3');
    title.textContent = '示例卡片组件';
    container.appendChild(title);
    
    const card = document.createElement('div');
    card.className = 'card';
    
    // 卡片头部
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.textContent = '卡片标题';
    card.appendChild(cardHeader);
    
    // 卡片内容
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = `
        <p>这是一个示例卡片组件，展示了如何创建可重用的UI元素。</p>
        <p>卡片组件常用于展示内容块，具有清晰的视觉层次结构。</p>
        <button class="primary-btn mt-2">了解更多</button>
    `;
    card.appendChild(cardBody);
    
    container.appendChild(card);
    return container;
}

/**
 * 创建表单组件
 */
function createFormComponent() {
    const container = document.createElement('div');
    container.className = 'mt-4';
    
    const title = document.createElement('h3');
    title.textContent = '示例表单组件';
    container.appendChild(title);
    
    const form = document.createElement('form');
    form.id = 'example-form';
    form.className = 'card';
    
    // 表单头部
    const formHeader = document.createElement('div');
    formHeader.className = 'card-header';
    formHeader.textContent = '联系表单';
    form.appendChild(formHeader);
    
    // 表单内容
    const formBody = document.createElement('div');
    formBody.className = 'card-body';
    
    // 姓名字段
    const nameGroup = document.createElement('div');
    nameGroup.className = 'form-group';
    nameGroup.innerHTML = `
        <label for="name">姓名</label>
        <input type="text" id="name" name="name" required>
    `;
    formBody.appendChild(nameGroup);
    
    // 邮箱字段
    const emailGroup = document.createElement('div');
    emailGroup.className = 'form-group';
    emailGroup.innerHTML = `
        <label for="email">邮箱</label>
        <input type="email" id="email" name="email" required>
    `;
    formBody.appendChild(emailGroup);
    
    // 消息字段
    const messageGroup = document.createElement('div');
    messageGroup.className = 'form-group';
    messageGroup.innerHTML = `
        <label for="message">消息</label>
        <textarea id="message" name="message" rows="4" required></textarea>
    `;
    formBody.appendChild(messageGroup);
    
    // 提交按钮
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'primary-btn';
    submitButton.textContent = '提交';
    formBody.appendChild(submitButton);
    
    form.appendChild(formBody);
    container.appendChild(form);
    
    return container;
}

/**
 * 创建统计组件
 */
function createStatsComponent() {
    const container = document.createElement('div');
    container.className = 'mt-4';
    
    const title = document.createElement('h3');
    title.textContent = '示例统计组件';
    container.appendChild(title);
    
    const statsContainer = document.createElement('div');
    statsContainer.style.display = 'grid';
    statsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
    statsContainer.style.gap = '20px';
    statsContainer.style.marginTop = '20px';
    
    // 统计项1
    const stat1 = createStatItem('100+', '项目完成');
    statsContainer.appendChild(stat1);
    
    // 统计项2
    const stat2 = createStatItem('95%', '客户满意度');
    statsContainer.appendChild(stat2);
    
    // 统计项3
    const stat3 = createStatItem('50+', '专业团队');
    statsContainer.appendChild(stat3);
    
    // 统计项4
    const stat4 = createStatItem('10+', '行业经验');
    statsContainer.appendChild(stat4);
    
    container.appendChild(statsContainer);
    return container;
}

/**
 * 创建单个统计项
 */
function createStatItem(value, label) {
    const item = document.createElement('div');
    item.className = 'card';
    item.style.textAlign = 'center';
    item.style.padding = '20px';
    
    const valueElement = document.createElement('div');
    valueElement.style.fontSize = '2rem';
    valueElement.style.fontWeight = 'bold';
    valueElement.style.color = 'var(--primary-color)';
    valueElement.textContent = value;
    
    const labelElement = document.createElement('div');
    labelElement.style.color = 'var(--text-light)';
    labelElement.textContent = label;
    
    item.appendChild(valueElement);
    item.appendChild(labelElement);
    
    return item;
}

/**
 * 初始化按钮交互
 */
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.primary-btn');
    
    buttons.forEach(button => {
        // 按钮点击效果
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        // 按钮点击事件
        button.addEventListener('click', function() {
            console.log('按钮被点击:', this.textContent.trim());
            
            // 如果是"开始使用"按钮，滚动到功能部分
            if (this.textContent.trim() === '开始使用') {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    window.scrollTo({
                        top: featuresSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 初始化表单验证
 */
function initFormValidation() {
    const form = document.getElementById('example-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 模拟表单提交
        const formData = new FormData(form);
        const formValues = {};
        
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        console.log('表单提交数据:', formValues);
        
        // 显示成功消息
        alert('表单提交成功！这是一个演示，数据已记录到控制台。');
        
        // 重置表单
        form.reset();
    });
}

/**
 * 工具函数：添加类
 */
function addClass(element, className) {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}

/**
 * 工具函数：移除类
 */
function removeClass(element, className) {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

/**
 * 工具函数：切换类
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * 工具函数：获取元素位置
 */
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        width: rect.width,
        height: rect.height
    };
}