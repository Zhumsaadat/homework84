import { Model } from 'mongoose';
import User from './models/User'
import exp = require('constants');

export interface UserMutation {
    username: string;
    password: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<User, {}, UserMethods>;


export interface TaskMutation{
    user: string,
    title: string,
    description: string,
    status: string,
}