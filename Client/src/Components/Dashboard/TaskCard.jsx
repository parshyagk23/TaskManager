import React from 'react'
import styles from './Dashborad.module.css';
import Cookies from 'js-cookie';
const TaskCard = ({ taskStatus, Taskdata, colr, handleDeleteTask,setSubmitTask,borders }) => {
  let isAdmin = Cookies.get('isAdmin')


  return (
    <>
    <section >
      <div className={styles.Task} >
        <h3>{taskStatus}</h3>
        {Taskdata?.length == 0 ? (
          <div style={{ textAlign: 'center' }} >
            <h4>task not found</h4>
          </div>
        ) : (
          <section style={{ height: '67vh', overflowY: 'scroll' }} >
            {Taskdata?.map((task) => (
              task.user.map((user, index) => (
                <div key={index} className={styles.tasks} >
                  <p> <span>Title:</span> {task?.title}</p>
                  <p>Assgin to:</p>
                  
                  <div>
                    <p>{user?.email}</p>
                  </div>
                  <p>dueDate: <span>{task?.dueDate.substring(0, 10)}</span></p>
                  <p>status:  <span style={{ border:user?.status==='Rejected'?'2px solid red': borders,color:user?.status==='Rejected'?'red':colr }} className={styles.status} >{user?.status}</span></p>
                  {taskStatus === 'Pending' && isAdmin === 'true' ? (
                    <div className={styles.taskbtn} >
                      <button>Edit</button>
                      <button onClick={() => handleDeleteTask(task._id, user._id)} >Delete</button>
                    </div>) : (
                    <>
                      {taskStatus === 'Pending' &&
                        <div onClick={()=>{
                          setSubmitTask({
                            taskId:task?.taskId,
                            userId:user?._id,
                            title:task?.title,
                            description:task?.description,
                            submittedDetails :user?.submittedDetails
                          })
                        }} className={styles.taskbtn} >
                          <button>submit</button>
                        </div>}
                    </>
                  )}
                  {taskStatus === 'Submitted' && isAdmin === 'true' &&
                    <div onClick={()=>
                      setSubmitTask(
                        {
                          taskId:task?._id,
                          userId:user?._id,
                          title:task?.title,
                          description:task?.description,
                          submittedDetails :user?.submittedDetails
                        }
                    )} className={styles.taskbtn} >
                      <button>check</button>
                    </div>}
                </div>
              ))
            ))}
          </section>
        )}

      </div>
    </section>
    </>
  )
}

export default TaskCard