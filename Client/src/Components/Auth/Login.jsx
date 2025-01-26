import React, { useState } from "react";
import styles from "./Auth.module.css";
import { login } from "./../../Api/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

const Login = () => {

  const navigate = useNavigate()
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [loading,setLoading] = useState(false)
  const handleOnchange = (e) => {
    setError(false);
    setLoginData({ ...LoginData, [e.target.id]: e.target.value });
  };
  const HandleError = () => {
    let isError = false;

    let newError = {
      email: "",
      password: "",

    };
    if (!LoginData.email.includes("@gmail.com")) {

      newError.email = 'Please enter correct email'
    }

    if (!LoginData.password) {
      newError.password = 'Password is required'
    }

    setError(newError)
    if (!LoginData.email.includes("@gmail.com") || !LoginData.password) {
      isError = true;
    }
    return isError
  }
  const handleLogin = async () => {
    setLoading(true)
    let isError = HandleError();
    if (isError) {
      setLoading(false)
      return
    }
    const responce = await login(LoginData);

    if (responce.errormessage === "Invalid Credentials!!") {
      toast.error(responce.errormessage, { position: "top-center" });
      setLoginData({ email: "", password: "" });
      setLoading(false)
      return;
    }

    setLoginData({ email: "", password: "" });
    setTimeout(() => {
      navigate('/')
    }, 2000);
    toast.success("Login successful", { position: "top-center" });
    setLoading(false)
  };

  return (
    <>
      <ToastContainer />
      <main className={styles.auth}>
        <h1 style={{ margin: '0' }} >Login</h1>
        <div className={styles.userdata} >
          <label htmlFor="email">Email</label>
          <div>
            <input
              placeholder="enter email"
              value={LoginData.email}
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
          <label htmlFor="password">Password</label>
          <div>
            <input

              placeholder="enter password"
              value={LoginData.password}
              id="password"
              type="password"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.password}</p>
          </div>
        </div>
        <div onClick={handleLogin} className={styles.loginbtn}>
          <button>Log in</button>
        </div>
         {loading&&  <Loader />}
      </main>
    </>
  );
};

export default Login;