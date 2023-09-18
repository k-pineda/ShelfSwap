import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_SAVED_BOOKS } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";
import jwt_decode from "jwt-decode";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import bookNotFound from "../assets/bookNotFound.jpg";

function Swap() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_ALL_SAVED_BOOKS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <LoadingIndicator />;
  }

  const allSavedBooks = data.books || [];

  const filteredBooks = allSavedBooks.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const token = Auth.loggedIn() ? Auth.getToken() : null;

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
          <h1>Click "Ask To Swap!" To Initiate Book Swap With User</h1>
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
      </Container>
      <Container className="my-5">
        <Row>
          {filteredBooks.map((book) => (
            <Col
              key={book._id}
              md="12"
              className="my-2"
              style={{ maxHeight: "300px" }}
            >
              <Card className="bg-dark">
                <Row>
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
                      <Card.Text>Owner: {book.owner.username}</Card.Text>
                      <Card.Text className="pt-3">
                        {book.description.length > 400
                          ? book.description.slice(0, 400) + "..."
                          : book.description}
                      </Card.Text>
                      <div className="text-end">
                        <Button
                          id="button"
                          onClick={() => handleAskToSwap(book.owner._id)}
                        >
                          Ask to Swap!
                        </Button>
                      </div>
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

export default Swap;
