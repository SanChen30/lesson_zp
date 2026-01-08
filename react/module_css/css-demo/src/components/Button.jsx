// module.css 是 css module 的文件
// css in js
// react 将 css 文件 编译成 js 对象
// 类名 作为 js 对象的 key
// 类名的值会被编译为随机的 hash 字符串，形成绝对唯一的名字
import styles from './Button.module.css';

console.log(styles);
export default function Button() {
    return (
            <>
        <h1 className={styles.txt}>你好，世界！！！</h1>
        <button className={styles.button}>My Button</button>
    </>
    )
}