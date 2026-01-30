import {
  useLocation,
  Link
} from 'react-router-dom';

function Navigation() {
  const isActive = (to) => {
    const location = useLocation();
    return location.pathname === to ? 'active' : '';
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to='/' className={isActive('/')}>Home</Link>
        </li>
        <li>
          <Link to='/about' className={isActive('/about')}>About</Link>
        </li>
        <li>
          <Link to='/user/123' className={isActive('/user/123')}>User Profile</Link>
        </li>
        <li>
          <Link to='/products' className={isActive('/products')}>Products</Link>
        </li>
        <li>
          <Link to='/products/new' className={isActive('/products/new')}>New Product</Link>
        </li>
        <li>
          <Link to='/products/123' className={isActive('/products/123')}>Product Detail</Link>
        </li>
        <li>
          <Link to='/pay' className={isActive('/pay')}>Pay</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;