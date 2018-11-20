import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  employee_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});
