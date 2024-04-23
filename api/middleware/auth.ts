import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { TaskMutation } from '../types';
import Task from '../models/Task';


export interface RequestWithTask extends Request {
  task?: Document<TaskMutation>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithTask;
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ message: 'Please log in' });
  }

  const taskId = req.params.id;
  const userId = req.body.user;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).send({ message: 'Task not found' });
  }

  if (task.user.toString() !== userId) {
    return res.status(403).send({ message: 'Forbidden' });
  }


  req.body._id = taskId;
  next();
};

export default auth;