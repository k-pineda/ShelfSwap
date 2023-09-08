import React, { useState } from 'react';

function SwapBooks() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [message, setMessage] = useState('');

  // Sample list of books from the server
  const booksFromServer = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
  ];

  // Function to handle book selection
  const handleBookSelection = (bookId) => {
    const isBookSelected = selectedBooks.includes(bookId);

    if (isBookSelected) {
      // Deselect the book if it's already selected
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      // Select the book if it's not already selected
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  // Function to initiate a message for book swap
  const initiateMessage = () => {
    if (selectedBooks.length !== 2) {
      setMessage('Select exactly 2 books to initiate a message.');
      return;
    }

    // Prepare a message to send to the other user
    const book1 = booksFromServer.find((book) => book.id === selectedBooks[0]);
    const book2 = booksFromServer.find((book) => book.id === selectedBooks[1]);

    if (book1 && book2) {
      const messageContent = `Hey, I'd like to swap my "${book1.title}" for your "${book2.title}"! Are you interested?`;
      setMessage(messageContent);
    }
  };

  return (
    <div>
      <h1>Initiate Message for Book Swap</h1>

      {/* Book selection form */}
      <form>
        {booksFromServer.map((book) => (
          <div key={book.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.id)}
                onChange={() => handleBookSelection(book.id)}
              />
              {book.title}
            </label>
          </div>
        ))}
      </form>

      <button onClick={initiateMessage}>Initiate Message</button>

      {/* Message content */}
      {message && <p>{message}</p>}

      {/* View saved books */}
      <Container>
        <h2 className="pt-5">
          {user.savedBooks?.length
            ? `Viewing ${user.savedBooks.length} saved ${
                user.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {user.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default SwapBooks;
