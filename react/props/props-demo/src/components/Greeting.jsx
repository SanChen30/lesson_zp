import PropTypes from 'prop-types'; // prop 类型约定，校验

// 给谁打招呼？
// 数组解构，解构了 props 对象的 name、message、showIcon 属性，并为 message 提供了默认值
function Greeting({ name, message = "Welcome to ByteDance!", showIcon }) {
    return (
        <div>
            {showIcon && <span>👋</span>}
            <h1>Hello, {name}!</h1>
            <h2>{message}</h2>
        </div>
    )
}

Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    message: PropTypes.string,
    showIcon: PropTypes.bool,
}

export default Greeting;