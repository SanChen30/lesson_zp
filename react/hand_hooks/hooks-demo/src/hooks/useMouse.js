// 封装响应式的 mouse 业务
// UI 组件更简单，HTML + CSS , 好维护
// 复用和组件一样，是前端团队的核心资产
import {
    useState,
    useEffect,
} from 'react';

export const useMouse = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    useEffect(() => {
        const update = (e) => {
            console.log('////');
            setX(e.pageX);
            setY(e.pageY);
        }
        window.addEventListener('mousemove', update);
        console.log('||||');
        return () => {
            console.log('|||| 清除');
            window.removeEventListener('mousemove', update);
        }
    }, [])

    // 把要向外部暴漏的状态和方法返回
    return {
        x,
        y,
    }
}