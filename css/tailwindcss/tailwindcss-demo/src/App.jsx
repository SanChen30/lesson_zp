export default function App() {
    // Mobile First，用 flex-col 布局，主内容在上面，侧边栏在下面
    // md:flex-row 布局，主内容在左边，侧边栏在右边，只有在中等屏幕及以上才生效
    // 即768px及以上，符合大多数平板横屏和桌面端的起始宽度。
    return (
        // gap-4 用于设置 Flexbox 或 Grid 容器中子元素之间间距为4个单位
        <div className="flex flex-col md:flex-row gap-4">
          <main className="bg-blue-100 p-4 md:w-2/3">
            主内容
          </main>
          {/* “当屏幕宽度达到 md 断点（默认 ≥768px）时，将元素的宽度设置为父容器的 1/3。” */}
          <aside className="bg-green-100 p-4 md:w-1/3">
            侧边栏
          </aside>
        </div>
    )
}