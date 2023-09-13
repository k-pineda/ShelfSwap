const { AuthenticationError } = require('apollo-server-express');
const { User, Book, Category, Chat } = require('../models');
const { signToken } = require('../utils/auth');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

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
    createChat: async (parent, { sender, receiver, message }) => {
      const chat = await Chat.create({
        sender,
        receiver,
        message,
      });
      return chat;
    },
    sendMessage: async (parent, { chatId, message }, context) => {
      const chat = await Chat.create({
        sender: context.user._id,
        receiver: chatId, // Assuming receiver is the chatId
        message: [{
          sender: context.user._id,
          text: message,
        }],
      });
    
      // Publish the new chat message to subscribers of this chat room
      pubsub.publish(`CHAT_MESSAGE_${chatId}`, { chatMessage: chat });
    
      return chat;
    },
  Subscription: {
    chatMessage: {
      subscribe: (_, { chatId }) => {
        // Return an asyncIterator that listens for new chat messages
        return pubsub.asyncIterator(`CHAT_MESSAGE_${chatId}`);
      },
    },
  },
},
};

module.exports = resolvers;
