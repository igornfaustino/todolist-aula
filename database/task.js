const prisma = require("./prisma");

const findAllTasks = (userId) => {
  return prisma.task.findMany({
    where: {
      userId,
    },
  });
};

const saveTask = (task, userId) => {
  return prisma.task.create({
    data: {
      name_task: task.name_task,
      description: task.description,
      is_done: task.is_done,
      //   userId: userId
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

module.exports = {
  findAllTasks,
  saveTask,
};
