import {
    useRef,
    useEffect
} from 'react';

// load more 通用组件
interface InfiniteScrollProps {
    hasMore: boolean; // 是否所有数据都加载了，分页
    isLoading?: boolean; // 是否正在加载数据
    onLoadMore: () => void; // 加载更多数据的回调函数 /api/post?page=2&limit=10
    children: React.ReactNode; // 子元素，通常是列表项
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    hasMore,
    onLoadMore,
    isLoading = false,
    children
}) => {
    // HTMLDivElement React 前端全局模块
    const sectinelRef = useRef<HTMLDivElement>(null);
    // 监听哨兵元素，只有在组件挂载之后，sentinelRef.current 才会有值
    useEffect(() => {
        if (!hasMore || isLoading) return;  // 没有数据了或正在加载数据，不监听
        // IntersectionObserver 来自于浏览器内部，没有性能问题，不需要防抖
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { // 是否进入视窗，viewport
                onLoadMore();
            }
        }, {
            threshold: 0 // 阈值，目标元素与视口的交集区域占目标元素面积的比例，默认0，达到多少时，触发IntersectionObserver回调函数
        });
        if (sectinelRef.current) {
            observer.observe(sectinelRef.current);
        }
        // 卸载时（路由切换），断开与哨兵元素的监听
        return () => {
            if(sectinelRef.current) {
                observer.unobserve(sectinelRef.current);
            }
        }
    }, [onLoadMore, hasMore, isLoading])
    return (
        // react 不建议直接访问dom，用 useRef
        <>
            {children}
            {/* Intersection Observer 哨兵元素*/}
            <div ref={sectinelRef} className="h-4" />
            {
                isLoading && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                        加载中...
                    </div>
                )
            }
        </>
    )
}

export default InfiniteScroll;