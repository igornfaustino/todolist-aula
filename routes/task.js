const express = require("express");
const z = require("zod");
const { findAllTasks, saveTask } = require("../database/task");
const { task } = require("../database/prisma");
const auth = require("../middleware/auth");

const router = express.Router();

const TaskSchema = z.object({
  name_task: z.string(),
  description: z.string(),
  is_done: z.boolean().default(false),
});

router.get("/tasks", auth, async (req, res) => {
  const tasks = await findAllTasks(req.userId);
  res.json({
    tasks,
  });
});

router.post("/task", auth, async (req, res) => {
  try {
    const task = TaskSchema.parse(req.body);
    const userId = req.userId;
    const savedTask = await saveTask(task, userId);
    res.status(201).json({
      task: savedTask,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }
    res.status(500).json({
      message: "server error",
    });
  }
});

module.exports = router;
