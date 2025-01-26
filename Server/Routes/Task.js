const express = require("express");
const router = express.Router();

const { HandleAddTask,HandleGetAllTasks,
        HandleGetTaskByTaskId,HandleUpdateTask,HandleDeleteTaskByTaskId,
        getTaskAssignedToUser,updateUserTask,ApproveUserTask
    } = require("../Controller/Tasks");
const {verifyToken} = require("../Middleware/VerifyToken")

router.post("/addtask", verifyToken, HandleAddTask)
router.get("/", verifyToken,HandleGetAllTasks) 
router.get("/:id", verifyToken,HandleGetTaskByTaskId) 
router.patch("/:taskid/:indexid", verifyToken,HandleDeleteTaskByTaskId) 
router.put("/:id", verifyToken,HandleUpdateTask) 
router.get('/user/:email' ,verifyToken,getTaskAssignedToUser)
router.patch('/:taskId/user/:indexId' ,verifyToken,updateUserTask)
router.patch('/apporve/:taskId/user/:indexId' ,verifyToken,ApproveUserTask)


module.exports = router