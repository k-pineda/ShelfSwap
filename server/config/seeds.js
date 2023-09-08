const db = require('./connection');
const { User, Book, Category } = require('../models');

db.once('open', async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    // Seed categories
    const categories = await Category.insertMany([
      { name: 'Fiction' },
      { name: 'Non-Fiction' },
      { name: 'Mystery' },
      { name: 'Science Fiction' },
    ]);

    // Seed random users with usernames
    const users = await User.create([
      {
        username: 'user1', // Provide a username
        email: 'user1@example.com',
        password: 'password12345',
      },
      {
        username: 'user2', // Provide a username
        email: 'user2@example.com',
        password: 'password67890',
      },
      {
        username: 'user3', // Provide a username
        email: 'user3@example.com',
        password: 'passwordabcd',
      },
    ]);

    // Seed random books with valid owner IDs
    const books = await Book.insertMany([
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        description: 'A novel about teenage angst.',
        condition: 'Used',
        image: 'catcher.jpg',
        category: categories[0]._id,
        owner: users[0]._id,
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        description: 'An epic fantasy trilogy.',
        condition: 'New',
        image: 'lotr.jpg',
        category: categories[0]._id,
        owner: users[1]._id,
      },
      {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        description: 'A classic novel about morality and punishment.',
        condition: 'Like New',
        image: 'crime.jpg',
        category: categories[2]._id,
        owner: users[2]._id,
      },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    process.exit();
  }
});
