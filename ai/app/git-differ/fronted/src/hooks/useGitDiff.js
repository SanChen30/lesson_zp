// 封装 git diff 得到 LLM 给我们的规范的 commit message
import { useState, useEffect } from 'react';
import { chat } from '../api/index2.js';

// use 开头 自定义hooks，封装响应式业务，副作用等，从组件中剥离出来的业务逻辑
// 组件只负责单一的UI，不负责业务逻辑
export const useGitDiff = () => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    useEffect(() => {
        (
            async () => {
                setLoading(true);
                const { data } = await chat('你好');
                setContent(data.reply);
                setLoading(false);
            }
        )();
    }, [])
    return {
        loading, // 加载中
        content, // commit message
    }
}