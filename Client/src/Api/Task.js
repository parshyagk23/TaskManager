import axios from "axios";
import Cookies from "js-cookie";
const TaskUrl = import.meta.env.VITE_REACT_APP_POLL_URL ;
const Token = Cookies.get("token");

export const AddTask = async ({title, description, user, dueDate}) => {
    try {
        
        const userId=Cookies.get('userId')
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/addtask`;
        const responce = await axios.post(reqUrl, {title,description,user,dueDate ,TaskId:userId});
        return responce?.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const getAllTask = async () => {
    try {
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task`;
        const responce = await axios.get(reqUrl);
        return responce?.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const getTaskByTaskId=async(userId)=>{
    try {
        const Token = Cookies.get("token");
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/${userId}`;
        const responce = await axios.get(reqUrl);
        return responce?.data;
        
    } catch (error) {
        return error?.response?.data;
        
    }
}
export const DeleteTaskByTaskId=async(taskid,indexid)=>{
    try {
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/${taskid}/${indexid}`;
        const responce = await axios.patch(reqUrl);
        return responce?.data;
        
    } catch (error) {
        return error?.response?.data;
        
    }
}
export const UpdateTaskByTaskId=async(id,task)=>{
    try {
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/${id}`;
        const responce = await axios.put(reqUrl,task);
        return responce?.data;
        
    } catch (error) {
        return error?.response?.data;
        
    }
}
export const getTaskAssignedToUser=async(email)=>{
    try {
        const Token = Cookies.get("token");
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/user/${email}`;
        const responce = await axios.get(reqUrl);
        return responce?.data;
        
    } catch (error) {
        return error?.response?.data;
        
    }
}
export const updateUserTask=async(TaskId,indexId,submittedDetails)=>{
    try {
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/${TaskId}/user/${indexId}`;
        const responce = await axios.patch(reqUrl,{submittedDetails});
        return responce?.data;
        
    } catch (error) {
        return error?.response?.data;
        
    }
}
export const ApproveUserTask=async(TaskId,indexId,isApproved)=>{
    try {
        axios.defaults.headers.common['Authorization']=Token
        const reqUrl = `${TaskUrl}/task/apporve/${TaskId}/user/${indexId}`;
        const responce = await axios.patch(reqUrl,{isApproved});
        return responce?.data;
        
    } catch (error) {
        return error?.response?.data;
        
    }
}
