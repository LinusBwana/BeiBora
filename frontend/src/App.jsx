import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/homepage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };
  
  return (
    <div>
		<Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
		<Homepage />
      	<Footer />
    </div>
  )

}
export default App
