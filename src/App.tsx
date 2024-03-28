import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./page/Home";
import Blog from "./page/Blog";
// import Project from "./page/Project";
import Detail from "./components/blog/Detail";
import About from "./page/About";
import Login from "./page/Login";
import Profile from "./page/Profile";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { useEffect } from "react";
import { axiosInstance } from "./api/axios.instance";
import { login, logout } from "./redux/feature/Auth/auth.slide";


export default function App() {
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (auth?.accessToken) {
      axiosInstance.get('auth/profile', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      }).then(res => {
        dispatch(login({ user: res?.data }))
      }).catch(() => {
        dispatch(logout())
      })
    }
  }, [])
  return (
    <Routes>
      <Route element={
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" >
          <Route index element={<Blog />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        {/* <Route path="/projects" element={<Project />} /> */}
        <Route path="/about-us" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

