# ShelfSwap
Welcome to ShelfSwap! This web application allows users to discover and swap books with other users. Share your love for reading, connect with fellow book enthusiasts, and build your personal library.

<img width="949" alt="shelfswap" src="https://github.com/k-pineda/ShelfSwap/assets/128410226/77ffbad2-3ddf-4a41-b2a0-48e2435faead">


## Features

- **Discover Books**: Browse a wide range of books listed by other users.
- **Swap Requests**: Send and receive swap requests to exchange books.
- **Messaging**: Communicate with other users in via the built-in messaging system.
- **Profile Management**: Manage your profile, update book listings, and view your swap history.
- **Donations**: Support the platform by making monetary donations. The donation button appears when hovering over the "i" icon.

## Technologies Used

- **Frontend**: React, Apollo Client, React-Bootstrap, Material UI
- **Backend**: Node.js, Express.js, Apollo Server, GraphQL, MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe (Donations)
- **Deployment**: Heroku (Backend)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/k-pineda/ShelfSwap.git
   cd book-swap-platform
   ```

2. Install the required dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the necessary environment variables, including database connection details, JWT secret, and Stripe API key.

   ```env
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   STRIPE_API_KEY=your-stripe-api-key
   ```

4. Start the backend server:

   ```bash
   cd server
   node server.js
   ```

5. Start the frontend development server:

   ```bash
   cd client
   npm start
   ```

6. Open your web browser and visit `http://localhost:3000` to access the Book Swap Platform.

## Usage

1. **Sign Up**: Create an account or log in if you already have one.
2. **Browse Books**: Explore the available books listed by other users.
3. **Initiate Swap**: Click the "Ask To Swap!" button to send a swap request for a book you're interested in.
4. **Messaging**: Use the messaging system to communicate with other users about the swap.
5. **Profile**: Manage your profile, update book listings, and keep track of your swap history.
6. **Donations**: Support the platform by making monetary donations. Hover over the "i" icon to reveal the donate button.

## Contributing

We welcome contributions from the community! If you have ideas for improvements or encounter any issues, please open a GitHub issue or submit a pull request.

## Links 

https://github.com/k-pineda/ShelfSwap

https://shelf-swap-425acc537cee.
herokuapp.com/


## Acknowledgments

- Special thanks to the open-source community and the developers behind the technologies used in this project. 

https://github.com/Anthony-D99
https://github.com/Josiahr4321
https://github.com/spereira15
https://github.com/mybaditssam
