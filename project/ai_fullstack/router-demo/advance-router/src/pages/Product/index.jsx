import { Outlet } from 'react-router-dom';


export default function Product() {
    return (
        <>
        <h2>产品列表</h2>
            {<Outlet />}
        </>
    )
}