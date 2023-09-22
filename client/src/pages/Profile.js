import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations"; // Import the mutations
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import bookNotFound from "../assets/bookNotFound.jpg";

function Profile() {
 

  const [deleteBook] = useMutation(DELETE_BOOK);

  const { loading, data } = useQuery(QUERY_USER);

  let user;
  if (data) {
    user = data.user;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  const savedBooks = user ? user.ownedBooks : [];



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
          <h1>Your Saved Books!</h1>
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

                          <Button
                            id="button"
                            onClick={() => handleDeleteBook(book._id)}
                          >
                            Delete
                          </Button>
                    
                      
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