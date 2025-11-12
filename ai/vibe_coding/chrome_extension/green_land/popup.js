document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('changeColor').addEventListener('click', function() {
    // 获取当前标签页
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs && tabs.length > 0) {
        const activeTab = tabs[0];
        console.log('准备更改标签页背景颜色，标签页ID:', activeTab.id);
        
        // 注入CSS样式来更改背景颜色
        chrome.scripting.insertCSS({
          target: {tabId: activeTab.id},
          css: `
            html, body, * {
              background-color: #4CAF50 !important;
              background-image: none !important;
            }
            
            /* 确保覆盖所有常见的内容区域 */
            main, #main, article, .content, .container, .wrapper {
              background-color: transparent !important;
              background-image: none !important;
            }
          `
        }, function() {
          console.log('CSS注入完成');
          
          // 同时注入JavaScript来进一步确保背景色更改
          chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            function: function() {
              console.log('执行背景色更改脚本');
              
              // 直接设置document元素的背景色
              document.documentElement.style.backgroundColor = '#4CAF50';
              document.body.style.backgroundColor = '#4CAF50';
              
              // 清除任何可能干扰的背景图像
              document.documentElement.style.backgroundImage = 'none';
              document.body.style.backgroundImage = 'none';
              
              // 设置更高的优先级
              document.documentElement.setAttribute('style', 'background-color: #4CAF50 !important; background-image: none !important;');
              document.body.setAttribute('style', 'background-color: #4CAF50 !important; background-image: none !important;');
              
              // 创建并添加样式表以确保全局应用
              let style = document.createElement('style');
              style.type = 'text/css';
              style.innerHTML = `
                * {
                  background-color: #4CAF50 !important;
                  background-image: none !important;
                }
              `;
              document.head.appendChild(style);
              
              console.log('背景色已成功更改为绿色');
            }
          }, function() {
            console.log('JavaScript注入完成');
            // 提供视觉反馈给用户
            alert('页面背景颜色已更改为绿色！');
          });
        });
      } else {
        console.error('无法获取当前活动标签页');
        alert('无法获取当前页面，请刷新后重试。');
      }
    });
  });
});