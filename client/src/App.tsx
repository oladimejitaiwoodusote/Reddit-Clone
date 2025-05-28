import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Popular from './pages/Popular'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div>
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/popular" element= {<Popular/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
