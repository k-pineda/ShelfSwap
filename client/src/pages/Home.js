import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS_BOOKS, QUERY_USER } from "../utils/queries";
import { SAVE_BOOK } from "../utils/mutations";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import bookNotFound from "../assets/bookNotFound.jpg";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

const SearchBooks = () => {
  
  const { loading: loadingUserBooks, data: userBooksData } = useQuery(QUERY_USERS_BOOKS);
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  const isUserLoggedIn = Auth.loggedIn();

  const { loading, data, refetch } = useQuery(QUERY_USER);
  const savedBooks = data?.user ? data.user.ownedBooks : [];
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [addBook, { error }] = useMutation(SAVE_BOOK);

  // Create an array of showFullDescription states, one for each book
  const [bookShowFullDescription, setBookShowFullDescription] = useState(
    new Array(searchedBooks.length).fill(false)
  );
  // Function to toggle the showFullDescription for a specific book
  const toggleShowDescription = (bookIndex) => {
    const updatedShowDescription = [...bookShowFullDescription];
    updatedShowDescription[bookIndex] = !updatedShowDescription[bookIndex];
    setBookShowFullDescription(updatedShowDescription);
  };

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  }, [savedBookIds]);
  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchGoogleBooks(searchInput);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await addBook({
        variables: { bookInput: { ...bookToSave } },
      });
      if (data && data.addBook) {
        const updatedUserBooks = userBooksData
          ? [...userBooksData.userBooks, data.addBook]
          : [data.addBook];
        setSavedBookIds([...savedBookIds, bookToSave.bookId]); 
        if (userBooksData) {
          userBooksData.userBooks = updatedUserBooks;
        }
        
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingUserBooks || loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="text-light bg-dark ps-5 py-2">
        <Container id="nav">
          <h1 id="nav">Search for Books to Add to Your Collection!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8} id="nav">
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search books by title"
                />
              </Col>
              <Col xs={12} md={4} id="nav">
                <Button type="submit" id="button" size="lg">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Container className="my-5">
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : ""}
        </h2>
        <Row>
          {searchedBooks.map((book, index) => (
            <Col
              key={book.bookId}
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
                      <Card.Text className="pt-3">
                        {book.description
                          ? book.description.length > 400
                            ? book.description.slice(0, 400) + "..."
                            : book.description
                          : ""}
                      </Card.Text>
                      <div className="text-end">
                        {isUserLoggedIn ? (
                          savedBooks.find(
                            (savedBook) => savedBook.bookId === book.bookId
                          ) ? (
                            <Button id="button" variant="info" disabled>
                              Book is Saved
                            </Button>
                          ) : (
                            <Button
                              id="button"
                              variant="info"
                              onClick={() => handleSaveBook(book.bookId)}
                            >
                              Save Book
                            </Button>
                          )
                        ) : (
                          ""
                        )}
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
};
export default SearchBooks;
