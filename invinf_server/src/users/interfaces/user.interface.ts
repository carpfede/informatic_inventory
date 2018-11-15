import { Document } from 'mongoose';

export interface User extends Document {
    readonly title: string;
    readonly content: string;
    readonly userId: string;
}