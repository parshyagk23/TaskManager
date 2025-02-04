import React from 'react'
import {jwtDecode} from 'jwt-decode'
import Cookies from "js-cookie";
import {Navigate} from 'react-router-dom'

const ProtectRoute = ({Component}) => {
    function isTokenExpired(token) {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp;
        return (Date.now() >= expiry * 1000);
    }

    function checkAndRemoveToken() {
        const token = Cookies.get('token');
    
        if (token && isTokenExpired(token)) {
            Cookies.remove('token');
            Cookies.remove('userId');
            return
        }
        return token
    }
    const isLoggedIn=checkAndRemoveToken();
  return (
    <div>
      {isLoggedIn ?<Component />:<Navigate to='/login' />}
    </div>
  )
}

export default ProtectRoute