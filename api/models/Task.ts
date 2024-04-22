import { TaskMutation } from '../types';
import mongoose, { Model, Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const TaskSchema = new Schema<TaskMutation>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['new', 'in_progress', 'complete'],
        default: 'new'
    }
});

const Task = mongoose.model<TaskMutation>('Task', TaskSchema);

export default Task;