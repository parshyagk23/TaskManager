import React from 'react'
import styles from './Dashborad.module.css';
import { useNavigate } from 'react-router-dom';
const TaskCard = ({isAdmin, taskStatus, Taskdata, colr, handleDeleteTask, setSubmitTask, borders,loading }) => {
  
  const navigate = useNavigate()

  return (
    <>
      <section >
        <div className={styles.Task} >
          <h3>{taskStatus}</h3>
          {Taskdata?.length == 0 ? (
            <div style={{ textAlign: 'center' }} >
              <h4 style={{marginBottom:'10px'}} >task not found</h4>
              {loading &&<h3>Loading...</h3>}
            </div>
          ) : (
            <section style={{ height: '67vh', overflowY: 'scroll' }} >
              {Taskdata?.map((task) => (
                task?.user?.map((user, index) => (
                  <div key={index} className={styles.tasks} >
                    <p> <span>Title:</span> {task?.title}</p>
                    <p>Assgin to:</p>

                    <div>
                      <p>{user?.email}</p>
                    </div>
                    <p>dueDate :<span>{task?.dueDate?.substring(0, 10)}</span></p>
                    {user.status !== "Pending" && <p>Submitted At: <span>{user?.submittedAt?user?.submittedAt?.substring(0, 10):'Not Submitted'}</span></p>}
                    <p>status:  <span style={{ border: user?.status === 'Rejected' ? '2px solid red' : borders, color: user?.status === 'Rejected' ? 'red' : colr }} className={styles.status} >{user?.status}</span></p>
                    {taskStatus === 'Pending' && isAdmin ? (
                      <div className={styles.taskbtn} >
                        <button onClick={() => {
                          navigate('/task', { state: { task, edit: true } })
                        }}  >Edit</button>
                        <button onClick={() => handleDeleteTask(task._id, user._id)} >Delete</button>
                      </div>) : (
                      <>
                        {taskStatus === 'Pending' &&
                          <div onClick={() => {
                            setSubmitTask({
                              taskId: task?.taskId,
                              userId: user?._id,
                              title: task?.title,
                              description: task?.description,
                              submittedDetails: user?.submittedDetails
                            })
                          }} className={styles.taskbtn} >
                            <button>submit</button>
                          </div>}
                      </>
                    )}
                    {taskStatus === 'Submitted' && isAdmin  &&
                      <div onClick={() =>
                        setSubmitTask(
                          {
                            taskId: task?._id,
                            userId: user?._id,
                            title: task?.title,
                            description: task?.description,
                            submittedDetails: user?.submittedDetails
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