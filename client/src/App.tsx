import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Popular from './pages/Popular'
import FullPost from './pages/FullPost'
import { Routes, Route } from 'react-router-dom'
import Subreddit from './pages/Subreddit'


function App() {
  
  return (
    <>
      <Navbar/>
      <div className='AppLayout'>
        <Sidebar/>
        <main className='MainContent'>
          <Routes>
            <Route path="/" element= {<Home/>}/>
            <Route path="/popular" element= {<Popular/>}/>
            {/* <Route path="/post/:id" element={<FullPost/>}/> */}
            <Route path="/subreddit/r/:subreddit_name" element={<Subreddit/>}/>
            <Route path="/subreddit/r/:subreddit_name/post/:id" element={<FullPost/>}/>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
