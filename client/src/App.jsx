import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Blogs from "./pages/Blogs"
import BlogEditor from "./pages/BlogEditor"


function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-edit/:id" element={<BlogEditor />} />
      </Routes>
    </>
  )
}

export default App
