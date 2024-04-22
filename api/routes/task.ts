import express from 'express';
import Task from '../models/Task';
import User from '../models/User';

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

export default taskRouter;