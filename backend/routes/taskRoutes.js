const express = require("express");
const router = express.Router();

const {
  createTask,
  deleteAllTasks,
  deleteTask,
} = require("../controllers/taskController");

const { verifyToken } = require("../middlewares/userMiddlewares");

router.post("/create-task", verifyToken, createTask);
router.delete("/delete-task", verifyToken, deleteTask);

//for developement purpose only
router.delete("/delete-tasks", deleteAllTasks);

module.exports = router;
