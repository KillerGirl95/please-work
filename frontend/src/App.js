import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import MainHome from './components/Home'

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
        <Routes>
            <Route 
              path="/" 
              element={<MainHome />}
            />
            <Route 
              path="/home" 
              element={user ? <Home /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/signin" 
              element={!user ? <Login /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/signin" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
