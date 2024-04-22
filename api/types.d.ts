import { Model } from 'mongoose';

export interface UserMutation {
    username: string;
    password: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;

    generateToken(): void;
}

export type UserModel = Model<UserMutation, {}, UserMethods>;


export interface TaskMutation {
    user: string,
    title: string,
    description: string,
    status: string,
}