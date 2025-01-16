import './App.css'
import Posts from './components/Posts'
import {Routes,Route} from 'react-router-dom'
import Post from './components/Post'
import { Navigate } from 'react-router-dom'

function App() {

  return (
   <div className="bg-gradient-to-r from-dark-blue-1 via-dark-blue-2 to-dark-blue-3 min-h-screen">

    <Routes>
      <Route path='/posts/:id'  element={<Post/>} />
      <Route path='/posts'  element={<Posts/>} />
      <Route path='/'  element={<Navigate to={'/posts'}/>} />

    </Routes>
   </div>
  )
}

export default App
