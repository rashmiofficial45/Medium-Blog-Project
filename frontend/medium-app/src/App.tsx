// import { useState } from 'react'
import {
  BrowserRouter,
  // Link,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "./pages/Signup";
import {Blogs} from "./pages/Blogs";
import Signin from "./pages/Signin";
import { Blog } from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
