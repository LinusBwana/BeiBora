import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList'

function App() {
  
  return (
    <div>
      <Navbar />
      <ProductList />
    </div>
  )

}
export default App
