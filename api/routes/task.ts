import express from 'express';
import Task from '../models/Task';
import User from '../models/User';
import auth from '../middleware/auth';

const taskRouter = express.Router();

taskRouter.post('/', async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(404).send({message: 'Not found token'});
        }

        const user = await User.findById(req.body.user);

        if (user?.token !== token) {
            return res.status(401).send({error: 'Unauthorized'});
        }

        const taskData = new Task({
            user: req.body.user,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        });

        const newTaskData = new Task(taskData);
        await newTaskData.save();
        res.send(newTaskData);
    } catch (e) {
        next(e);
    }
});

taskRouter.get('/', async (req, res, next) => {
  try{
    const token = req.header('Authorization');
    if (!token) {
      return res.status(404).send({message: 'Not found token'});
    }

    const userId = req.body.user;
    const tasks = await Task.find({ user: userId });
    res.send(tasks);
  }catch (e){
    next(e)
  }
});

taskRouter.put('/:id', auth, async (req, res, next) => {
  try {
    console.log(req.body)
    const taskId = req.body._id;

    await Task.findByIdAndUpdate(taskId, req.body);
    const updatedTask = await Task.findById(taskId);

    res.send(updatedTask);
  } catch (e) {
    next(e);
  }
});

taskRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const taskId = req.body._id;
    await Task.findByIdAndDelete(taskId);
    res.send({ message: 'Task deleted successfully' });
  } catch (e) {
    next(e);
  }
});

export default taskRouter;