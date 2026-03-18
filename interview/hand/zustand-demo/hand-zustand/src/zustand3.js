export function createStore() {
    let state = { count: 0 };
    // 不重复的数据容器 新的数据结构
    // set 确保不重复关注 建立订阅关系的容器
    const listeners = new Set(); // 所有的订阅者
    const getState = () => state;
    const setState = (newState) => {
        state = newState;
        // 通知所有的订阅者，执行订阅函数
        listeners.forEach(listener => listener())
    }
    const subscribe = (listener) => {
        listeners.add(listener);
        // 返回一个函数，用于取消订阅
        return () => listeners.delete(listener);
    }
    return {
        getState,
        setState,
        subscribe
    }
}