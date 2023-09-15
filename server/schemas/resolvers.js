const { AuthenticationError } = require('apollo-server-express');
const { User, Book, Category, Chat, ChatMessage } = require('../models');
const { signToken } = require('../utils/auth');
// const { PubSub } = require('graphql-subscriptions');

// const pubsub = new PubSub();

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    books: async (parent, { category, title }) => {
      try {
        const params = {};

        if (category) {
          params.category = category;
        }

        if (title) {
          const books = await Book.find({ $text: { $search: title } }).populate('category');
          return books;
        }

        return await Book.find(params).populate('category').populate('owner');
      } catch (error) {
        throw new Error(`Error searching for books: ${error.message}`);
      }
    },
    book: async (parent, { _id }) => {
      return await Book.findById(_id).populate('category').populate('owner');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('ownedBooks');
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    userBooks: async (parent, { userId }) => {
      return await Book.find({ owner: userId });
    },
    chat: async (parent, { chatId }, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }
      // Find a chat by its ID if the user is a participant
      const chat = await Chat.findOne({ _id: chatId, users: user._id }).populate("users");
      if (!chat) {
        throw new Error('Chat not found');
      }
      return chat;
    },
    userChats: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }
      // Find chats where the user is one of the participants
      const chats = await Chat.find({ users: user._id }).populate('users');
      console.log(chats)
      return chats;
    },
    chatMessages: async (parent, { chatId }, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('Not logged in');
      }
      // Find chat messages for a specific chat if the user is a participant
      const chat = await Chat.findOne({ _id: chatId });
      if (!chat) {
        throw new Error('Chat not found');
      }

      const messages = await ChatMessage.find({ chat: chat._id }).populate('sender');
      
      return messages;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const book = await Book.create({
        ...args.bookInput,
        owner: context.user._id,
      });
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { ownedBooks: book._id } },
        { new: true }
      );
      return book;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateBook: async (parent, { _id, quantity }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const book = await Book.findOne({ _id, owner: context.user._id });
      if (!book) {
        throw new AuthenticationError('The book with the provided ID either does not exist or you are not authorized to modify it.');
      }
      const decrement = Math.abs(quantity) * -1;
      return await Book.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    deleteBook: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const book = await Book.findOne({ _id, owner: context.user._id });
      if (!book) {
        throw new AuthenticationError('The book with the provided ID either does not exist or you are not authorized to delete it.');
      }
      await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { ownedBooks: _id } },
        { new: true }
      );
      await Book.findByIdAndDelete(_id);
      return 'Book deleted successfully';
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createChat: async (parent, { users }, { models }) => {
      const chat = await Chat.create({ users });
      return chat;
    },
    sendMessage: async (parent, { chatId, sender, text }, { user }) => {
      const message = await ChatMessage.create({ chat: chatId, sender:user, text });
      return message;
    },
  },
};

module.exports = resolvers;
