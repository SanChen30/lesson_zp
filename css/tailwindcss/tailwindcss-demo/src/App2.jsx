const ArticleCard = () => {
  // JSX + TailWindCSS(UI的一部分) = UI
  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">Tailwindcss</h2>
      <p className="text-gray-500 mt-2">
        用 utlity class 快速构建 UI
      </p>
    </div>
  )
}

export default function App() {
  return (
    // <div className="flex justify-center items-center bg-blue-500">
    //   111
    // </div>
    // Fragment 文档碎片节点
    <>
      <h1>111</h1>
      <h2>222</h2>
      {/* 1rem 16px, px 表示水平方向的 padding, 4 表示4个单位，1个单位是0.25rem */}
      <button className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400">提交</button>
      <button className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">取消</button>
      <ArticleCard />
    </>
  )
}