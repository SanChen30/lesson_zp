import {
    // use 开头的函数，hooks 函数
    useState, // 响应式状态管理
    useEffect // 副作用管理 onMounted 挂载之后
} from 'react';


const Home = () => {
    const [repos, setRepos] = useState([]);
    // render 是第一位的
    // console.log('Home 组件渲染了');
    useEffect(() => {
        // home 组件可以看到了
        // console.log('Home 组件挂载了');
        // 发送api请求，不会和组件渲染去争抢
        fetch('https://api.github.com/users/shunwuyu/repos')
            .then(res => res.json())
            .then(json => setRepos(json))
    }, [])
    return (
        <div>
            <h1>Home</h1>
            {
                repos.length ? (
                    <ul>
                        {
                            repos.map(repo => (
                                <li key={repo.id}>
                                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                                        {repo.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    );
}

// ESM commonjs

export default Home;