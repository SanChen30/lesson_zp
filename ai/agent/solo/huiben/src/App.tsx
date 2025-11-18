import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Activities from './pages/Activities'
import ReadingRecord from './pages/ReadingRecord'
import UserCenter from './pages/UserCenter'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="activities" element={<Activities />} />
          <Route path="reading" element={<ReadingRecord />} />
          <Route path="profile" element={<UserCenter />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App