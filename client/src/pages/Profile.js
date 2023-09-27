import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import bookNotFound from "../assets/bookNotFound.jpg";
import Pagination from "@mui/material/Pagination";
import { CardGroup } from "react-bootstrap"; // Import CardGroup

function Profile() {
  const [deleteBook] = useMutation(DELETE_BOOK);
  const { loading, data } = useQuery(QUERY_USER);

  let user;
  if (data) {
    user = data.user;
  }

  const [showDescriptions, setShowDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Add useEffect for saving and loading showDescriptions
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

  const savedBooks = user ? user.ownedBooks : [];

  // Function to handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Your Saved Books!</h1>
        </Container>
      </div>

      <Container className="my-5">
        <CardGroup>
          {savedBooks.map((book) => (
            <Card
              key={book._id}
              className="bg-dark mb-4"
              style={{ maxWidth: "300px" }}
            >
              <Card.Body className="text-white">
                <Card.Img
                  style={{
                    maxHeight: "300px",
                    maxWidth: "300px",
                  }}
                  src={book.image ? book.image : bookNotFound}
                  alt={book.title}
                />
                <Card.Title className="fs-4 fw-bold">{book.title}</Card.Title>
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
                        onClick={() => {
                          setShowDescriptions((prevDescriptions) => ({
                            ...prevDescriptions,
                            [book._id]: !prevDescriptions[book._id],
                          }));
                        }}
                      >
                        {showDescriptions[book._id] ? "Show Less" : "Show More"}
                      </Button>
                    </>
                  )}
                </Card.Text>

                <Button id="button" onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
        <Pagination
          count={Math.ceil(savedBooks.length / booksPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Container>
    </>
  );
}

export default Profile;
