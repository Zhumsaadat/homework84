import express from 'express';
import cors from 'cors'
import usersRouter from './routes/user';
import mongoose from 'mongoose';
import config from './config';
import taskRouter from './routes/task';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/task', taskRouter);

const run = async () => {
    await mongoose.connect((config.mongoose.db));

    app.listen(port, () => {
        console.log(`Port: ${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();