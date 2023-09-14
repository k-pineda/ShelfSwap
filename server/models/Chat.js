// server/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessage',
    },
  ],
});

// Ensure that each chat has exactly two users
chatSchema.index({ users: 1 }, { unique: true, partialFilterExpression: { users: { $size: 2 } } });

module.exports = mongoose.model('Chat', chatSchema);
