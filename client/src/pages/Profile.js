import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { DELETE_BOOK, UPDATE_BOOK } from '../utils/mutations'; // Import the mutations

function Profile() {
  // Define the useMutation hooks for deleteBook and updateBook
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const { loading, data } = useQuery(QUERY_USER);
  const [newQuantity, setNewQuantity] = useState(0); // Define newQuantity state
  let user;
  if (data) {
    user = data.user;
  }
console.log(user)
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const savedBooks = user ? user.ownedBooks : [];


  // Define a function to handle updating the book quantity
  const handleUpdateBook = async (_id) => {
    try {
      await updateBook({
        variables: { _id, quantity: newQuantity },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Define a function to handle deleting a book
  const handleDeleteBook = async (_id) => {
    try {
      await deleteBook({
        variables: { _id },
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload(false);
  };

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>

      <Container className="my-5">
        <h2>Your Saved Books</h2>
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
                  {/* Input field for updating the book quantity */}
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateBook(book._id)}
                  >
                    Update Quantity
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
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
