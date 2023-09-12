import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Profile() {
  // Define the useMutation hooks for deleteBook and updateBook
  const { loading, data } = useQuery(QUERY_USER);
  const [newQuantity, setNewQuantity] = useState(0); // Define newQuantity state
  let user;

  if (data) {
    user = data.user;
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const savedBooks = user ? user.ownedBooks : [];


  

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
          {savedBooks.map((book) => (
            <Col key={book._id} md="4">
              <Card>
                <Card.Img src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle>{book.author}</Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    as={Link}
                    to={`/books/${book._id}`}
                    variant="primary"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Profile;
