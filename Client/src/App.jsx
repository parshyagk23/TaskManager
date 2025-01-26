import React from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import ProtectRoute from './ProtectRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import CreateTask from './Components/Task/CreateTask'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<ProtectRoute Component={Dashboard}/>} />
      <Route path="/task" element={<ProtectRoute Component={CreateTask}/>} />

      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
     
    </>
  )
}

export default App
