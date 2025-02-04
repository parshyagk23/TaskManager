import React, { useState, useEffect, useContext } from 'react'
import { getTaskByTaskId, getTaskAssignedToUser } from '../../Api/Task'
import TaskCard from './TaskCard';
import styles from './Dashborad.module.css';
import Card from './Card';
import { DeleteTaskByTaskId } from '../../Api/Task';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../useContext';
import Cookies from 'js-cookie';
const Dashboard = () => {
  const [task, SetTask] = useState()
  const [PendingData, setPendingData] = useState()
  const [SubmittedData, setSubmittedData] = useState()
  const [ApprovedData, setApprovedData] = useState()
  const [submitTask, setSubmitTask] = useState()
  const [loading, setLoading] = useState(false)
  const UserInfo = useContext(UserContext)
  const [UserData, setUserData] = useState(UserInfo)
  console.log(UserData)
  const GetTask = async () => {
    setLoading(true)
    const Id = Cookies.get("userId")
    if(UserData){
      if (UserData?.isAdmin == true) {
        const res = await getTaskByTaskId(Id);
        SetTask(res.data);
        setLoading(false)
      } else {
        const res = await getTaskAssignedToUser(UserData?.email);
        if (res.errormessage === "Task not assigned") return
        SetTask(res.data)
        setLoading(false)
      }
    }
   
  }
  const filterData = () => {
    const pendingData = [];
    const submittedData = [];
    const approvedData = [];
    const currentDate = new Date();

    task?.forEach((data) => {
      const taskDueDate = new Date(data.dueDate);

      if (taskDueDate < currentDate) {
        data.user?.forEach((user) => {
          if (user.status !== "Approved" && user.status !== "Rejected") {

            if (!user.submittedAt) {
              user.status = "Rejected";
            } else {
              user.status = "Approved";
            }
          }
        });
      }

      const pendingUsers = data.user?.filter((user) => user.status === "Pending");
      const submittedUsers = data.user?.filter((user) => user.status === "Submitted");
      const approvedOrRejectedUsers = data.user?.filter(
        (user) => user.status === "Approved" || user.status === "Rejected"
      );

      if (pendingUsers.length > 0) pendingData.push({ ...data, user: pendingUsers });
      if (submittedUsers.length > 0) submittedData.push({ ...data, user: submittedUsers });
      if (approvedOrRejectedUsers.length > 0) approvedData.push({ ...data, user: approvedOrRejectedUsers });
    });

    setPendingData(pendingData);
    setSubmittedData(submittedData);
    setApprovedData(approvedData);
  };

  const handleDeleteTask = async (TaskId, indexId) => {
    const res = await DeleteTaskByTaskId(TaskId, indexId)
    let toastS;
    if (res.data) {
      toastS = toast.success(res.data, { position: 'top-center' })
    }
    setTimeout(() => {
      getTaskData()
      toast.dismiss(toastS);
    }, 1500);
  }
  useEffect(() => {

    if (UserInfo?.isAdmin !== undefined) {
      setUserData(UserInfo);
     
    }
  }, [UserInfo]);
  
  useEffect(()=>{
    GetTask()
  },[submitTask, setSubmitTask, SetTask,UserData])
  
  useEffect(() => {
    filterData()
  }, [task])

  return (
    <>

      <ToastContainer />
      <div className={styles.Dash} >
        <h1>Tasks</h1>

        <section className={styles.TaskContainer}  >
          <TaskCard isAdmin={UserInfo?.isAdmin} taskStatus='Pending' borders='2px solid #FFEB3B' colr='#FFEB3B' Taskdata={PendingData} handleDeleteTask={handleDeleteTask} setSubmitTask={setSubmitTask} loading={loading} />
          <TaskCard isAdmin={UserInfo?.isAdmin} taskStatus='Submitted' borders='2px solid #03A9F4' colr="#03A9F4" Taskdata={SubmittedData} setSubmitTask={setSubmitTask} loading={loading} />
          <TaskCard isAdmin={UserInfo?.isAdmin} taskStatus='Approved' borders='2px solid #4CAF50' colr="#4CAF50" Taskdata={ApprovedData} loading={loading} />
          {submitTask && <Card isAdmin={UserInfo?.isAdmin} setSubmitTask={setSubmitTask} submitTask={submitTask} />}
        </section>
      </div>
    </>
  )
}

export default Dashboard