import React, { useState } from 'react'
import styles from './Dashborad.module.css';
import Cookies from 'js-cookie';
import { updateUserTask, ApproveUserTask } from '../../Api/Task';
const Card = ({ setSubmitTask, submitTask }) => {
  let isAdmin = Cookies.get('isAdmin')
  const [submittedDetails, setSubmittedDetails] = useState('')
  const [Error, setError] = useState(false)
  const [isSubmit, setisSubmit] = useState()
  const [isApproved, setIsApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const onHandlechange = (e) => {
    setSubmittedDetails(e.target.value)
  }

  const SubmitTask = async () => {
    setLoading(true)

    if (submittedDetails === "") {
      setError(true)
      return
    }
    const res = await updateUserTask(submitTask.taskId, submitTask.userId, submittedDetails)
    if (res.message) {
      setisSubmit("Task Submitted")
      setTimeout(() => {
        setSubmitTask(false)
      }, 1000);
      setLoading(false)
    }
  }
  const HandleIsApproved = async (val) => {
    setLoading(true)
    setIsApproved(val)
    const res = await ApproveUserTask(submitTask.taskId, submitTask.userId, val)
    if (res.message) {
      setisSubmit(res.message)
      setLoading(false)

    }

  }
  return (
    <section className={styles.card}  >
      {isSubmit &&
        <div>
          <p style={{ color: 'green' }} >{isSubmit}</p>
        </div>
      }
      <div style={{ marginBottom: '20px' }} >
        <label htmlFor="">Title:</label>
        <p>{submitTask?.title}</p>
      </div>
      <div>
        <label htmlFor="">Description:</label>
        <p>{submitTask?.description}</p>
      </div>
      {isAdmin === 'true' ? (
        <div>
          <label htmlFor="task">Submitted Task Details:</label>
          <p style={{}} >{submitTask?.submittedDetails}</p>
        </div>
      ) : (
        <div>
          <label htmlFor="task">Submit your task:</label>
          <div style={{ display: 'inline', }} >
            <textarea name="submittedDetails" value={submittedDetails} onChange={(e) => onHandlechange(e)} id="task" cols={5} rows={5} placeholder='Enter your task Details' >  </textarea>
            {Error && <p style={{ color: 'red', fontSize: '12px' }} > required</p>}
          </div>
        </div>
      )}
      {isAdmin == "true" ? (
        <div>

        <div className={styles.cardbtn} style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '20px' }} >
          <button onClick={() => { HandleIsApproved(true) }} > Approved</button>
          <button onClick={() => { HandleIsApproved(false) }} >Reject</button>
          <button onClick={() => setSubmitTask(false)} >Cancel</button>
        </div>
        {loading&&<h4 style={{textAlign:'center', margin:'10px 0'}} >Loading....</h4>}

        </div>) : (
        <div  >

          <div className={styles.cardbtn} style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '20px' }} >
            <button onClick={() => SubmitTask()} > Submit</button>
            <button onClick={() => setSubmitTask(false)} >Cancel</button>
          </div>
          {loading&&<h4 style={{textAlign:'center', margin:'10px 0'}} >Loading....</h4>}
        </div>)}

    </section>
  )
}

export default Card