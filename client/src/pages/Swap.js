import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_SAVED_BOOKS } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";
import jwt_decode from "jwt-decode";

function Swap() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_ALL_SAVED_BOOKS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const allSavedBooks = data.books || [];

  const filteredBooks = allSavedBooks.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorsMatch =
      Array.isArray(book.authors) &&
      book.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return titleMatch || authorsMatch;
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.data._id;

  const handleAskToSwap = async (receiverId) => {
    try {
      const { data } = await createChat({
        variables: {
          users: [userId, receiverId],
        },
      });

      const chatId = data.createChat._id;
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error(error);
    }
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
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Row>
          {allSavedBooks.map((book) => (
            <Col key={book._id} md="4">
              <Card>
                <Card.Img src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle>Authors: {book.authors}</Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
                  <Button onClick={() => handleAskToSwap(book.owner._id)}>
                    Ask To Swap!
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

export default Swap;
