const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

exports.createTask = async (req, res) => {
  try {
    //importing values and returing response if problem occurs
    const userId = req.user.id;
    const { taskName } = req.body;

    if (!taskName) {
      return res.status(400).json({
        success: false,
        message: "all the fields are required",
      });
    }

    //checking if a user with this email exists or not
    const existingUser = await userModel.findById(userId);

    console.log("printing the user for whom the task will be created", existingUser);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //checking if taskname is empty
    if (taskName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "task cant be emty",
      });
    }

    const taskEntry = await taskModel.create({
      taskName: taskName,
      user: existingUser.email,
    });

    await userModel.findByIdAndUpdate(
      userId,
      {
        $push: { tasks: taskName },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "task successfully created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  
}

//for development purpose only
exports.deleteAllTasks = async (req, res) => {
  try {
    await taskModel.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "all tasks successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
