import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Popular from './pages/Popular'
import FullPost from './pages/FullPost'
import { Routes, Route } from 'react-router-dom'


function App() {
  
  return (
    <>
      <Navbar/>
      <div className='AppLayout'>
        <Sidebar/>
        <main className='MainContent'>
          <Routes>
            <Route path="/" element= {<Home/>}/>
            <Route path="/post/:id" element={<FullPost/>}/>
            <Route path="/popular" element= {<Popular/>}/>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
