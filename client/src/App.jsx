import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateBlog from "./pages/CreateBlog"
import ShowBlogsAdmin from './pages/ShowBlogsAdmin'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login'
import ChangeAdmin from './pages/ChangeAdmin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/showblogs',
    element: <ShowBlogsAdmin/>,
  },
  {
    path: '/changeadmin',
    element: <ChangeAdmin/>
  },
  {
    path: '/createblog',
    element: <CreateBlog/>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router = {router} />
        {/* <CreateBlog/>
        <ShowBlogs/> */}
    </div>
  )
}

export default App
