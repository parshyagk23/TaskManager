const Task = require("../Model/Tasks")

const HandleAddTask = async (req, res) => {

    try {
        const { title, description, dueDate, user, TaskId } = req.body;
        if (!title || !description || !dueDate || user.length == 0 || !TaskId) {
            return res.status(400).json({
                errormessage: "Bad request",
            })
        }
        const task = new Task({
            title,
            description,
            dueDate,
            TaskId,
            user
        });
        await task.save();
        return res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: "Internal server error",
        })
    }

}

const HandleGetAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ data: tasks });
    } catch (error) {
        return res.status(500).json({
            errorMessage: "Internal server error",
        })
    }
}
const HandleUpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, user } = req.body;
        if (!id || !title || !description || !dueDate || user.length == 0) {
            return res.status(400).json({
                errormessage: "Bad request",
            })
        }

        const task = await Task.findById({ _id: id });
        if (!task) {
            return res.status(404).json({
                errormessage: "Task not found!!",
            })
        }
        const UpdateTask = await Task.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    user: user
                }
            }
        )
        await UpdateTask.save();
        return res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: "Internal server error",
        })
    }
}

const HandleGetTaskByTaskId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                errormessage: "Bad request",
            })
        }
        const task = await Task.find({ TaskId: id });
        if (!task) {
            return res.status(404).json({
                errormessage: "Task not found!!",
            })
        }
        return res.status(200).json({ data: task });


    } catch (error) {
        res.status(500).json({
            errorMessage: "Internal server error",
        })
    }
}
const HandleDeleteTaskByTaskId = async (req, res) => {
    try {
        const { taskid, indexid } = req.params;
        if (!taskid || !indexid) {
            return res.status(400).json({
                errormessage: "Bad request",
            });
        }

        const task = await Task.findById({ _id: taskid });
        if (!task) {
            return res.status(404).json({
                errormessage: "Task not found!!",
            });
        }

        const userTask = task.user;
        const Taskindex = userTask.findIndex((user) => user._id.toString() === indexid);
        if (Taskindex === -1) {
            return res.status(404).json({
                errormessage: "User not found!!",
            });
        }
        const updatedUserTask = userTask.filter((user) => user._id.toString() !== indexid);
        if (updateUserTask.length === 0) {
            DeleteTask = await Task.findByIdAndDelete({ _id: taskid })
            await DeleteTask.save()
            return res.status(200).json({ data: 'task deleted Successfully' });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            { _id: taskid },
            { $set: { user: updatedUserTask } }
        );
        await updatedTask.save();

        return res.status(200).json({ data: 'task deleted Successfully' });
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: "Internal server error",
        });
    }
};

const getTaskAssignedToUser = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({
                errormessage: "Bad request",
            })
        }
        const tasks = await Task.find({ "user.email": email });
        if (tasks?.length == 0) {
            return res.status(404).json({
                errormessage: "Task not found!!",
            })
        }
        const result = tasks.map(task => ({
            taskId: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            user: [task.user.find(u => u.email === email)], // Find the specific user details
            createdAt: task.createdAt,
            updatedAt: task.UpdatedAt,
        }));
        return res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: "Internal server error",
        })
    }
}

const updateUserTask = async (req, res) => {
    try {

        const { taskId, indexId } = req.params;
        const { submittedDetails } = req.body;
        if (!taskId || !indexId || !submittedDetails) {
            return res.status(400).json({
                errormessage: "Bad request",
            })
        }
        const task = await Task.findById({ _id: taskId });
        if (!task) {
            return res.status(404).json({
                errormessage: "Task not found!!",
            })
        }
        let userTask = task.user
        const index = userTask.findIndex((user) => user._id == indexId);

        if (index === -1) {
            return res.status(404).json({
                errormessage: "User not found!!",
            })
        }
        if (userTask[index]?.status == 'Submitted') {
            return res.status(400).json({
                errormessage: "Task already submitted!!",
            })
        }
        userTask[index].submittedDetails = submittedDetails
        userTask[index].submittedAt = new Date()
        userTask[index].status = 'Submitted'

        const updateUserTask = await Task.findByIdAndUpdate(
            { _id: taskId },
            { $set: { user: userTask } }
        );
        await updateUserTask.save();
        return res.status(200).json({ message: 'Task submitted successfully' });

    } catch (error) {
        res.status(500).json({
            error,
        })

    }

}
const ApproveUserTask = async (req, res) => {
    try {

        const { taskId, indexId } = req.params;
        const {isApproved}= req.body;
        if (!taskId || !indexId) {
            return res.status(400).json({
                errormessage: "Bad request",
            })
        }
        const task = await Task.findById({ _id: taskId });
        if (!task) {
            return res.status(404).json({
                errormessage: "Task not found!!",
            })
        }
        let userTask = task.user
        const index = userTask.findIndex((user) => user._id == indexId);

        if (index === -1) {
            return res.status(404).json({
                errormessage: "User not found!!",
            })
        }
        if (userTask[index]?.status !== 'Submitted') {
            return res.status(400).json({
                errormessage: "Task not submitted!!",
            })
        }
        userTask[index].isApproved = isApproved
        userTask[index].status = isApproved?'Approved':'Rejected'

        const updateUserTask = await Task.findByIdAndUpdate(
            { _id: taskId },
            { $set: { user: userTask } }
        );
        
        await updateUserTask.save();
        let message= 'Task Rejected' ;
        if(isApproved){
            message="Task Apprived"
        }
        return res.status(200).json({ message});

    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: "Internal server error",
        })

    }

}





module.exports = {
    HandleAddTask, HandleGetAllTasks,
    HandleGetTaskByTaskId, HandleUpdateTask, HandleDeleteTaskByTaskId,
    getTaskAssignedToUser, updateUserTask, ApproveUserTask
}