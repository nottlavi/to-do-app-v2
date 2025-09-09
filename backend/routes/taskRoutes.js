const express = require("express");
const router = express.Router();

const { createTask, deleteAllTasks } = require("../controllers/taskController");

const { verifyToken } = require("../middlewares/userMiddlewares");

router.post("/create-task", verifyToken, createTask);

//for developement purpose only
router.delete("/delete-tasks", deleteAllTasks);

module.exports = router;
