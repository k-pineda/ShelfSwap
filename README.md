# ShelfSwap

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Welcome to ShelfSwap! This web application allows users to discover and swap books with other users. Share your love for reading, connect with fellow book enthusiasts, and build your personal library.

## Features

- **Discover Books**: Browse a wide range of books listed by other users.
- **Swap Requests**: Send and receive swap requests to exchange books.
- **Messaging**: Communicate with other users in via the built-in messaging system.
- **Profile Management**: Manage your profile, update book listings, and view your swap history.

## Technologies Used

- **Frontend**: React, Apollo Client, React-Bootstrap, Material UI
- **Backend**: Node.js, Express.js, Apollo Server, GraphQL, MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Heroku (Backend)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [How to Contribute](#contribution)
- [Questions](#questions)

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

To experience the application, visit the deployed Heroku website: [ShelfSwap](https://shelf-swap-425acc537cee.herokuapp.com/)

ShelfSwap walkthrough video: 

[![ShelfSwap](https://img.youtube.com/vi/tG68AySIsoo/0.jpg)](https://youtu.be/tG68AySIsoo)

## Credits

   Collaborators for ShelfSwap Application:

   Karen Pineda - https://github.com/k-pineda

   Anthony DiSerafino - https://github.com/Anthony-D99

   Josiah Rivera - https://github.com/Josiahr4321

   Jose Alzuri - https://github.com/Jalzu1007

## License

This project is licensed under MIT, for more information please visit: [MIT](https://opensource.org/licenses/MIT)

MIT License

  Copyright (c) 2023 ShelfSwap

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

## How to Contribute

We welcome any ideas and contributions to this repository. If you are interested in contributing, feel free to open an issue or submit a pull request.

## Questions

If you have any questions about the repository or the application, please open an issue, and we will respond as soon as possible. You can also explore more of our projects on 

- https://github.com/k-pineda

- https://github.com/Anthony-D99

- https://github.com/Josiahr4321

- https://github.com/Jalzu1007
