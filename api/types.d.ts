import { Model } from 'mongoose';
import User from './models/User'

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