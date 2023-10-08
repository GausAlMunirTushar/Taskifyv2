const taskModel = require('../models/taskModel')

const createTask = async (req, res) => {
    try {
        let reqBody = req.body;
        reqBody.email = req.headers['email'];
    
        const newTask = await taskModel.create(reqBody)
        res.status(201).json({
            status: "success",
            data: newTask
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: error
        })
    }
    
}

// delete a task 
const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = {_id: id}
        const deleteTask = await taskModel.findByIdAndRemove(query)
        res.status(200).json({
            status: "sucess",
            data: deleteTask
        })
    } catch (error) {
        res.status(401).json({
            status: "fail",
            data: error
        })
    }
}

const updateTaskStatus = async (req, res) => {
    try {
      const taskId = req.params.id; // Use a more descriptive variable name
      const newStatus = req.params.status;
  
      const query = { _id: taskId };
      const update = { status: newStatus }; // Use a more descriptive variable name for the update object
  
      const updatedTask = await taskModel.findOneAndUpdate(query, update, {
        new: true, // Return the updated document
      });
  
      if (!updatedTask) {
        return res.status(404).json({
          status: 'fail',
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error.message, // Include the error message for debugging
      });
    }
};

const getTaskByStatus = async (req, res) => {
    try {
        const newStatus = req.params.status;
    const email = req.headers['email'];
    const updateTaskStatus = await taskModel.aggregate([
        {$match: {status: newStatus, email: email}},
        {$project: {
            _id: 1,
            title: 1,
            description: 1,
            status: 1,
            createdDate: {
                $dateToString: {
                    date: "$createdDate",
                    format: "%d-%m-%Y"
                }
            }
        }}
    ])
    res.status(200).json({
        status: "success",
        data: updateTaskStatus
    })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            data: error
        })
    }
}
const getTaskStatusCount = async (req, res) => {
    try {
      const email = req.headers['email'];
  
      const statusCount = await taskModel.aggregate([
        { $match: { email: email } },
        {
          $group: {
            _id: "$status",
            sum: { $count: 1 }, // Use $sum to count documents in each group
          },
        },
      ]);
  
      res.status(200).json({
        status: 'success',
        data: statusCount,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

module.exports = {
    createTask,
    deleteTaskById,
    updateTaskStatus,
    getTaskByStatus,
    getTaskStatusCount
}