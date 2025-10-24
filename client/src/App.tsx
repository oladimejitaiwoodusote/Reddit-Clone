import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Popular from './pages/Popular'
import FullPost from './pages/FullPost'
import CreatePost from './pages/CreatePost'
import { Routes, Route } from 'react-router-dom'
import Subreddit from './pages/Subreddit'
import LoginModal from './components/LoginModal'
import SignupModal from './components/SingupModal'

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
            <Route path="/subreddit/r/:subreddit_name" element={<Subreddit/>}/>
            <Route path="/subreddit/r/:subreddit_name/post/:id" element={<FullPost/>}/>
            <Route path="/submit" element={<CreatePost/>}/>
          </Routes>         
        </main>
      </div>

      {/* Modals rendered globally*/}
      <LoginModal/>
      <SignupModal/>
    </>
  )
}

export default App