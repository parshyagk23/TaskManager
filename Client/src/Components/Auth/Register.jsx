import { useState } from "react";
import styles from "./Auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./../../Api/Auth";
import Loader from "../../Loader";
const Register = () => {
  const [RegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false
  });
  const [error, setError] = useState();
  const [Loading,setLoading]= useState()

  const handleOnchange = (e) => {
    setError({ username: "", email: "", password: "" });

    setRegisterData({ ...RegisterData, [e.target.id]: e.target.value });
  };
  const HandleError = () => {
    let isError = false;

    let newError = {
      email: "",
      password: "",
      username:""

    };
    if (!RegisterData.email.includes("@gmail.com")) {

      newError.email = 'Plase enter correct email'
    }

    if (!RegisterData.password) {
      newError.password = 'Password is required'
    }
    if (!RegisterData.username) {
      newError.username = 'Username is required'
    }

    setError(newError)
    if (!RegisterData.email.includes("@gmail.com") || !RegisterData.password || !RegisterData.username) {
      isError = true;
    }
    return isError
  }
  const handleRegister = async () => {
    setLoading(true)
    if (HandleError()) {
      setLoading(false)
      return;
    }
    const responce = await register(RegisterData);

    if (responce.errormessage === "Username Already exists") {
      toast.error("user Already exist with email", { position: "top-center" });
      setRegisterData({
        email: "",
        username: "",
        password: "",
      });
      setLoading(false)
      return;
    }
    toast.success("Register successful", { position: "top-center" });
    setLoading(false)
    setRegisterData({
      email: "",
      username: "",
      password: "",
    });
    
  };

  return (
    <>
      <ToastContainer />

      <main className={styles.auth}>
        <h1 style={{ margin: '0' }} >Register</h1>
        <div className={styles.userdata} >
          <label htmlFor="username"><span style={{ color: 'red' }} >*</span>Username  </label>
          <div>
            <input
              placeholder="enter username"
              value={RegisterData.username}
              id="username"
              type="text"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.username}</p>
          </div>

        </div>
        <div className={styles.userdata} >
          <label htmlFor="email"><span style={{ color: 'red',fontSize:'20px' }} >*</span>Email</label>
          <div>
            <input
              placeholder="enter email"
              value={RegisterData.email}
              id="email"
              type="email"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.email}</p>
          </div>

        </div>
        <div className={styles.userdata} >
          <label htmlFor="password"><span style={{ color: 'red',fontSize:'20px' }} >*</span>Password  </label>
          <div>
            <input

              placeholder="enter password"
              value={RegisterData.password}
              id="password"
              type="password"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.password}</p>
          </div>
        </div>
        <div style={{display:'flex' }} >
          <label   htmlFor="" style={{fontSize:"15px",width:'150px' }}> Register As Admin</label>
          <input type="checkbox" name="" id="" style={{width:'15px'}} checked={RegisterData.isAdmin}  onChange={(e)=>setRegisterData({...RegisterData,isAdmin:e.target.checked})} />
        </div>
        <div style={Loading?{opacity:'0.5'} :{} }  onClick={handleRegister} className={styles.loginbtn}>
          <button disabled={Loading} >Register</button>
        </div>
        {Loading &&<Loader/>}
      </main>
    </>
  );
};

export default Register;
