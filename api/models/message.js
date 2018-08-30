import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {type: String, required: true, lowercase: true},
  email: {type: String, required: true, lowercase: true},
  subject: {type: String, required: true, lowercase: true},
  message: {type: String, required: true, lowercase: true},
  read: {type: Number, default: 0}
}, {
  timestamps: true
});

export const Message = mongoose.model('Message', messageSchema);
