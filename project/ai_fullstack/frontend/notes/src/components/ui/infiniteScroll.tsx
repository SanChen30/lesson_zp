// load more 通用组件
interface InfiniteScrollProps {
    hasMore: boolean; // 是否所有数据都加载了，分页
    isLoading?: boolean; // 是否正在加载数据
    onLoadMore: () => void; // 加载更多数据的回调函数 /api/post?page=2&limit=10
    children: React.ReactNode; // 子元素，通常是列表项
}

const InfiniteScroll:React.FC<InfiniteScrollProps> = ({
    hasMore,
    onLoadMore,
    isLoading = false,
    children
}) =>  {
    return (
        <>
            {children}
        </>
    )
}

export default InfiniteScroll;