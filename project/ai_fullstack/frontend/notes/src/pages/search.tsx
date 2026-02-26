import {
    useNavigate
} from 'react-router-dom';
import { 
    useState,
    useEffect
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, X, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { 
    useSearchStore
} from '@/store/useSearchStore';
import {
    Card,
    CardContent
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    // Hook 每次 render 都会重新调用，意思就是当响应式数据 keyword 变化时，SearchPage 会重新 render，
    // 所以这里的 debounceKeyword 也会重新调用，防抖的值也会重新计算
    const debounceKeyword = useDebounce(keyword, 500); // 防抖之后的值
    const { 
        loading, 
        suggestions, 
        history,
        clearHistory,
        addHistory,
        search 
    } = useSearchStore();


    const handleSearch = (keyword: string) => {
        search(keyword);
    }
    useEffect(() => {
        if(debounceKeyword.trim()) {
            search(debounceKeyword);
        }
    }, [debounceKeyword])

    return (
        <div className="p-3 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-3">
                <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="relative flex-1">
                    <Input 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="搜索你想要的内容"
                        className="pr-9"
                    />
                    {
                        keyword && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 p-0"
                                onClick={() => setKeyword('')}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        )
                    }
                </div>
                <Button size="icon" variant="ghost" onClick={() => handleSearch(keyword)}>
                    <Search className="h-5 w-5" />
                </Button>
            </div>
            {
                !keyword && history.length > 0 && (
                    <Card className="mb-3">
                        <CardContent className="p-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">搜索历史</span>
                                <Button variant="ghost" size="sm" onClick={clearHistory}>清空</Button>
                            </div>
                            <div className="flex flex-wrap gap-2 ">
                                {
                                    history.map((item) => (
                                        <Button 
                                            key={item}
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => {
                                                handleSearch(item);
                                                setKeyword(item);
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
                )
            }
            {
                keyword && (
                    <Card>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[60vh]">
                                {
                                    loading && (
                                        <div className="p-4 text-center text-sm text-muted-foreground">
                                            搜索中...
                                        </div>
                                    )
                                }
                                {
                                    !loading && suggestions.length === 0 && (
                                        <div className="p-4 text-center text-sm text-muted-foreground">
                                            暂无搜索结果
                                        </div>
                                    )
                                }
                                {
                                    suggestions.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="px-4 py-3 border-b text-sm active:bg-muted"
                                            onClick={() => navigate('/')}
                                        >
                                            {item}
                                        </div>
                                    ))
                                }
                            </ScrollArea>
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}

export default SearchPage;