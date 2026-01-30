import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import RouterConfig from './router/index';

export default function App() {
  return (
    <Router>
      <Navigation />
      <RouterConfig />
    </Router>
  )
}