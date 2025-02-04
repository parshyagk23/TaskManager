import React, { useState,useEffect } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import ProtectRoute from './ProtectRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import CreateTask from './Components/Task/CreateTask'
import { UserContext } from './useContext'
import Cookies from 'js-cookie';
import { getUser } from './Api/Auth'
function App() {

  const [UserInfo,setUserInfo] = useState()
  const [userId,setUserId] =useState(Cookies.get("userId"))
  const [LogedIn,setLogedIn]= useState(false)
  const GetuserInfo = async()=>{
    setUserId(Cookies.get("userId"))
    if(userId){
    const responce = await getUser(userId)
    setUserInfo(responce.data)
    }
  }
  useEffect(() => {
    
    if(userId){
      GetuserInfo()
    }
  },[userId])

  useEffect(()=>{
    setUserId(Cookies.get("userId"))
  },[LogedIn,setLogedIn])
  
  return (
    <UserContext.Provider value={UserInfo} >
    <Navbar UserName = {UserInfo?.username} isAdmin ={UserInfo?.isAdmin} setLogedIn={setLogedIn}/>
    <Routes>
      <Route path="/" element={<ProtectRoute Component={Dashboard}/>} />
      <Route path="/task" element={<ProtectRoute Component={CreateTask}/>} />

      <Route path="/login" element={<Login setLogedIn={setLogedIn} />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
     
    </UserContext.Provider>
  )
}

export default App
