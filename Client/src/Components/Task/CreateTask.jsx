import React, { useEffect, useState } from "react";
import styles from './Task.module.css'
import { getAllUser } from "../../Api/Auth";
import { AddTask } from "../../Api/Task";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { use } from "react";
const CreateTask = () => {

  const isAdmin = Cookies.get('isAdmin')
  const navigate = useNavigate()
  const [UserData, setUserData] = useState()
  const [TaskData, setTaskData] = useState({
    title: '', description: '', user: [], dueDate: ''
  });
  const [Error, setError] = useState({
    title: '', description: '', user: '', dueDate: ''
  });
  const HandleAllUserData = async () => {
    const responce = await getAllUser()
    setUserData(responce.data)
  }
  useEffect(() => {
    HandleAllUserData()
  }, [])
  useEffect(() => {
    if (isAdmin !== 'true') {
      navigate('/')
    }
  })

  const handleOnchange = (e) => {
    setTaskData({ ...TaskData, [e.target.name]: e.target.value })
  }
  const handleAssignTaskToUser = (e) => {
    if (e.target.value === "") return

    if (TaskData.user.includes({ userId: e.target.value })) {
      return alert("user already assigned")
    }
    const newuser = [...TaskData.user, { email: e.target.value }];
    setTaskData({ ...TaskData, user: newuser })


    return
  }
  const handleRemoveTaskFromUser = (email) => {

    const index = UserData?.findIndex((user) => user.email === email)
    const UpdateUser = TaskData.user.filter((val) => val?.email !== UserData[index].email);
    setTaskData({ ...TaskData, user: UpdateUser })
    return
  }
  const HandleError = () => {
    let error = false
    let NewError = { title: '', description: '', user: '', dueDate: '' }
    if (!TaskData.title) {
      NewError.title = <p style={{ color: 'red', fontSize: '12px' }} >Title is required</p>
      error = true
    }
    if (!TaskData.description) {
      NewError.description = <p style={{ color: 'red', fontSize: '12px' }} >Description is required</p>
      error = true
    }
    if (TaskData.user.length == 0) {
      NewError.user = <p style={{ color: 'red', fontSize: '12px' }} >User is required</p>
      error = true
    }
    if (!TaskData.dueDate) {
      NewError.dueDate = <p style={{ color: 'red', fontSize: '12px' }} >Due Date is required</p>
      error = true
    }
    setError(NewError)
    return error
  }
  const HandleAddTask = async () => {
    if (HandleError()) return
    const res = await AddTask(TaskData)
    if (res?.message) {
      toast.success(res.message, { position: 'top-center' })
      setTaskData({ title: '', description: '', user: [], dueDate: '' })
    }

  }

  return (
    <>
      <ToastContainer />
      <main className={styles.Taskcontainer} >

        <h1>Assign Task to User</h1>
        <section className={styles.formContainer} >
          <div>
            <label htmlFor="title">title</label>
            <div>
              <input type="text" name="title" id="title" value={TaskData.title} onChange={(e) => handleOnchange(e)} />
              {Error.title}
            </div>
          </div>
          <div>
            <label htmlFor="description">description</label>
            <div>
              <textarea type="text" name="description" id="description" value={TaskData.description} cols={5} rows={5} onChange={(e) => handleOnchange(e)} />
              {Error.description}
            </div>
          </div>
          <div>
            <label htmlFor="user">Assigned to</label>
            <div>
              <select name="" id="user" value={TaskData.user.length == 0 && ""} onChange={(e) => handleAssignTaskToUser(e)} >
                <option value=""></option>
                {UserData?.map((user, index) => (
                  !user.isAdmin && <option key={index} value={user.email} >{user.email}</option>
                ))}
              </select>
              {Error.user}
            </div>
          </div>
          <div style={{ flexDirection: 'row', gap: '5px' }} >
            {TaskData?.user?.map((val, index) => (
              <button key={index} className={styles.Assign}  >
                <p key={index}>{val.email}</p>
                <span onClick={() => handleRemoveTaskFromUser(val.email)} >X</span>
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="dueDate">DueDate</label>
            <div>
              <input type="date" name="dueDate" id="dueDate" value={TaskData.dueDate} onChange={(e) => handleOnchange(e)} />
              {Error.dueDate}
            </div>
          </div>
          <div className={styles.btn} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
            <div onClick={() => HandleAddTask()} >
              <button>Save</button>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
export default CreateTask