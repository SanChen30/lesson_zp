import jwt from 'jsonwebtoken'; // 签发token, 验证token
const secret = "asdfghjkl"; // 密钥，安全

export default [
    {
        // restful 一切皆资源
        url: '/api/auth/login',
        method: 'post',
        timeout: 2000, // 延迟时间
        response: (req, res) => {
            let { name, password } = req.body;
            name = name.trim();
            password = password.trim();
            console.log(name, password, "----------");
            if (name === '' || password === '') {
                return {
                    code: 400, // Bad Request
                    msg: '用户名或密码不能为空',
                    data: null
                }
            }
            if (name !== 'admin' || password !== '123456') {
                return {
                    code: 401, // unauthorized
                    msg: '用户名或密码错误',
                    data: null
                }
            }

            const token = jwt.sign({
                user: {
                    // json 对象
                    id: 1,
                    name: 'admin',
                    avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/09aff03aaa33dd9d311511bcbd12535f~50x50.awebp'
                }
                // 密钥
            }, secret, {
                expiresIn: 86400 * 7 // 7天过期, token 的有效时间
            })

            console.log(token, "----------");
            return {
                token,
                user: {
                    id: 1,
                    name: "admin",
                    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/09aff03aaa33dd9d311511bcbd12535f~50x50.awebp"
                }
            }
        }
    },
    {
        url: '/api/auth/check',
        method: 'get',
        response: (req, res) => {
            const token = req.headers['authorization'].split(' ')[1];
            // console.log(token);
            try {
                const decode = jwt.decode(token, secret);
                console.log(decode);
                return {
                    code: 200,
                    user: decode.user
                }
            } catch (err) {
                return {
                    code: 400,
                    message: "invaild token"
                }
            }
        }
    }
]
