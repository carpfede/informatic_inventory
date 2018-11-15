import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
});