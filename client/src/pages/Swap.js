import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SAVED_BOOKS } from '../utils/queries';

function Swap() {
  const { loading, data } = useQuery(QUERY_ALL_SAVED_BOOKS);

  const [searchQuery, setSearchQuery] = useState('');
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const allSavedBooks = data.books || [];

  // Filter books based on the search query (title or author)
  // Filter books based on the search query (title or author)
// Filter books based on the search query (title or author)
const filteredBooks = allSavedBooks.filter((book) => {
  const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
  const authorsMatch = Array.isArray(book.authors) &&
    book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));

  return titleMatch || authorsMatch;
});


  

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Click "Send Message" To Initiate Book Swap With User</h1>
        </Container>
      </div>
      
      <Container className="my-5">
        <h2>Viewing Books Available For Swapping!</h2>
        
        {/* Add the search input */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        
        <Row>
          {filteredBooks.map((book) => (
            <Col key={book._id} md="4">
              <Card>
                <Card.Img src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle>Authors: {book.authors}</Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
                  <Button>Ask To Swap!</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Swap;
