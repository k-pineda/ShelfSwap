import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, CardGroup } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_SAVED_BOOKS } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";
import jwt_decode from "jwt-decode";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import bookNotFound from "../assets/bookNotFound.jpg";
import Pagination from "@mui/material/Pagination";

function Swap() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_ALL_SAVED_BOOKS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initialize showDescriptions with default false values for each book
  const initialShowDescriptions = {};
  const allSavedBooks = data ? data.books || [] : [];

  allSavedBooks.forEach((book) => {
    initialShowDescriptions[book._id] = false;
  });

  const [showDescriptions, setShowDescriptions] = useState(initialShowDescriptions);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    // Load showDescriptions from local storage when the component mounts
    const savedShowDescriptions = localStorage.getItem("showDescriptions");
    if (savedShowDescriptions) {
      setShowDescriptions(JSON.parse(savedShowDescriptions));
    }
  }, []);

  useEffect(() => {
    // Save showDescriptions to local storage whenever it changes
    localStorage.setItem("showDescriptions", JSON.stringify(showDescriptions));
  }, [showDescriptions]);

  if (loading) {
    return <LoadingIndicator />;
  }

  const filteredBooks = allSavedBooks.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    const authorsMatch =
      Array.isArray(book.authors) &&
      book.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return titleMatch || authorsMatch;
  });

  const toggleShowDescription = (bookId) => {
    setShowDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [bookId]: !prevDescriptions[bookId],
    }));
  };

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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Click "Ask To Swap!" To Initiate Book Swap With User</h1>
        </Container>
      </div>

      <Container className="my-5">
        <h2>Viewing Books Available For Swapping!</h2>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </Form.Group>
        </Form>
      </Container>

      <Container className="my-5">
        <CardGroup>
          {currentBooks.map((book, index) => (
            <Card
              key={book._id}
              className="bg-dark"
              style={{ maxWidth: "300px" }}
            >
              <Card.Body className="text-white">
                <Card.Img
                  style={{ maxHeight: "300px" }}
                  src={book.image ? book.image : bookNotFound}
                  alt={book.title}
                />
                <Card.Title className="fs-4 fw-bold">
                  {book.title}
                </Card.Title>
                <Card.Subtitle>Authors: {book.authors}</Card.Subtitle>
                <Card.Text className="pt-3">
                  {book.description && (
                    <>
                      {showDescriptions[book._id]
                        ? book.description
                        : book.description.length > 0
                        ? book.description.slice(0, 0) + "..."
                        : book.description}
                      <Button
                        id="button"
                        variant="primary"
                        onClick={() => toggleShowDescription(book._id)}
                      >
                        {showDescriptions[book._id] ? "Show Less" : "Show More"}
                      </Button>
                    </>
                  )}
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
            </Card>
          ))}
        </CardGroup>
        <Pagination
          count={Math.ceil(filteredBooks.length / booksPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Container>
    </>
  );
}

export default Swap;
