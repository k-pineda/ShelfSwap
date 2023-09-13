// import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SAVED_BOOKS } from '../utils/queries';

function Swap() {
  // Define the useMutation hooks for deleteBook and updateBook
  const { loading, data } = useQuery(QUERY_ALL_SAVED_BOOKS);
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const allSavedBooks = data.books || []
  
  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Click "Send Message" To Initiate Book Swap With User</h1>
        </Container>
      </div>
      
      <Container className="my-5">
        <h2>Viewing Books Available For Swapping!</h2>
        <Row>
          {allSavedBooks.map((book) => (
            <Col key={book._id} md="4">
              <Card>
                <Card.Img src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle>{book.author}</Card.Subtitle>
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
