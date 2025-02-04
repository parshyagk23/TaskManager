import axios from "axios";
import Cookies from "js-cookie";
const AuthUrl = import.meta.env.VITE_REACT_APP_POLL_URL ;
export const login = async ({ email, password }) => {
  try {
    const reqUrl = `${AuthUrl}/auth/login`;
    const responce = await axios.post(reqUrl, { email, password });  
    Cookies.set("token", responce.data.token);
    Cookies.set("userId", responce.data._id);
    return responce?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const register = async ({ username, email, password ,isAdmin}) => {
  try {
    const reqUrl = `${AuthUrl}/auth/register`;
    const responce = await axios.post(reqUrl, { username, email, password, isAdmin });
    return responce?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getUser = async (id ) => {
  try {
    const reqUrl = `${AuthUrl}/auth/user/${id}`;
    const responce = await axios.get(reqUrl);
    return responce?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const getAllUser = async ( ) => {
  try {
    const reqUrl = `${AuthUrl}/auth/user`;
    const responce = await axios.get(reqUrl);
    return responce?.data;
  } catch (error) {
    return error?.response?.data;
  }
};