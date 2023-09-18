import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import jwt_decode from "jwt-decode";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { DELETE_BOOK, UPDATE_BOOK } from "../utils/mutations"; // Import the mutations
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import bookNotFound from "../assets/bookNotFound.jpg";

function Profile() {
  const { username } = useParams(); // Access username from URL params

  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.data._id;

  const [deleteBook] = useMutation(DELETE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username }, // Pass username as a variable
  });

  const [newQuantity, setNewQuantity] = useState(0);
  let user;
  if (data) {
    user = data.user;
  }

  if (loading) {
    return <LoadingIndicator />;
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
      <div fluid="true" className="text-light bg-dark ps-5 py-4">
        <Container>
          <h3>Viewing {username}'s books!</h3>
        </Container>
      </div>

      <Container className="my-5">
        <Row>
          {savedBooks.map((book) => (
            <Col
              key={book._id}
              md="12"
              className="my-2"
              style={{ maxHeight: "300px" }}
            >
              <Card className="bg-dark">
                <Row noGutters>
                  <Col md={2} className="pe-0">
                    <Card.Img
                      style={{ maxHeight: "300px" }}
                      src={book.image ? book.image : bookNotFound}
                      alt={book.title}
                    />
                  </Col>
                  <Col md={10}>
                    <Card.Body className="text-white ps-2 pe-2 pb-2">
                      <Card.Title className="fs-4 fw-bold">
                        {book.title}
                      </Card.Title>
                      <Card.Subtitle>Authors: {book.authors}</Card.Subtitle>
                      <Card.Text className="pt-3">
                        {book.description.length > 400
                          ? book.description.slice(0, 400) + "..."
                          : book.description}
                      </Card.Text>
                      {user && user._id === userId && (
                        <div className="text-end">
                          <Button
                            id="button"
                            onClick={() => handleDeleteBook(book._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Profile;