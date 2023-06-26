import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateBlog from "./pages/CreateBlog"
import ShowBlogs from './pages/ShowBlogs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <CreateBlog/>
        <ShowBlogs/>
    </div>
  )
}

export default App
