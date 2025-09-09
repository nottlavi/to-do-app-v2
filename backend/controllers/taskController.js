const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

exports.createTask = async (req, res) => {
  try {
    //importing values and returing response if problem occurs
    const userId = req.user.id;
    const { taskName, dueAt } = req.body;

    if (!taskName) {
      return res.status(400).json({
        success: false,
        message: "all the fields are required",
      });
    }

    if (dueAt) {
      console.log("printing entered due date here:", dueAt);
    }

    //checking if a user with this email exists or not
    const existingUser = await userModel.findById(userId);

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
      dueAt: dueAt || undefined,
    });

    await userModel.findByIdAndUpdate(
      userId,
      {
        $push: { tasks: taskEntry._id },
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
  try {
    // fetching required info and returning suitable info

    const userId = req.user.id;
    const taskId = req.body.taskId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "no user found/not logged in/not authenticated",
      });
    }

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "no taskId entered/fetched",
      });
    }

    //finding entry for such a task id in the db
    const toDeleteEntry = await taskModel.findById(taskId);

    if (!toDeleteEntry) {
      return res.status(400).json({
        success: false,
        message: "no entry for such task id found in the db",
      });
    }

    //removing the entry from the user model's entry
    await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { tasks: toDeleteEntry._id },
      },
      { new: true }
    );

    //deleting the entry from taskModel db

    await taskModel.findByIdAndDelete(taskId);

    return res.status(200).json({
      success: true,
      message: "task successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

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
