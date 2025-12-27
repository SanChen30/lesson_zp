import { useContext } from 'react'; // 第三步
import { UserContext } from '../App.jsx';

export default function UserInfo() {
    // console.log(UserContext);
    const user = useContext(UserContext); // 第四步
    console.log(user);
    return (
        <div>
            {user.name}
        </div>
    )
}