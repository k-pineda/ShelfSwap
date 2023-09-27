import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, CardGroup } from "react-bootstrap";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS_BOOKS, QUERY_USER } from "../utils/queries";
import { SAVE_BOOK } from "../utils/mutations";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import bookNotFound from "../assets/bookNotFound.jpg";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import Pagination from '@mui/material/Pagination';
import { maxHeight } from "@mui/system";

const SearchBooks = () => {
  const { loading: loadingUserBooks, data: userBooksData } = useQuery(QUERY_USERS_BOOKS);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const isUserLoggedIn = Auth.loggedIn();
  const [showPagination, setShowPagination] = useState(false);

  const { loading, data, refetch } = useQuery(QUERY_USER);
  const savedBooks = data?.user ? data.user.ownedBooks : [];
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [addBook, { error }] = useMutation(SAVE_BOOK);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchedBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Function to handle page change
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
    };

  const toggleShowDescription = (bookIndex) => {
    const updatedBooks = [...searchedBooks];
    updatedBooks[bookIndex].showDescription = !updatedBooks[bookIndex].showDescription;
    setSearchedBooks(updatedBooks);
  };

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  }, [savedBookIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchGoogleBooks(searchInput);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
        showDescription: false, // Initialize showDescription as false
      }));
      setShowPagination(true);
      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!bookToSave) {
      console.error('Could not find book to save.');
      return;
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
      console.error('Error saving book:', err);
    }
  };

  if (loadingUserBooks || loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="search-text ps-5 py-2">
        <Container>
          <h1 className="text-center">
            Search for Books to Add to Your Collection!
          </h1>
          <Form onSubmit={handleFormSubmit}>
            <div className="d-flex justify-content-center">
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                style={{ width: '700px' }}
                placeholder="Search books by title"
              />
              <Button type="submit" id="button-form" size="md" className="ms-2">
                Search
              </Button>
            </div>
          </Form>
        </Container>
      </div>
      <Container className="my-5" >
        <h2 style={{ color: '#FFF4F4' }}>
          {currentBooks.length
            ? `Viewing ${currentBooks.length} results:`
            : ""}
        </h2>
        <CardGroup id="card-group">
          {currentBooks.map((book, index) => (
            <Card key={book.bookId}   className= "card-spacing custom-card">
              <Card.Body className="text-center" style={{ color: '#FFF4F4' }}>
                <Card.Img
                  style={{maxHeight:"400px",
                          maxWidth:'300px'}}
                  src={book.image ? book.image : bookNotFound}
                  alt={book.title}
                />
                <Card.Title className="fs-4 fw-bold">
                  {book.title}
                </Card.Title>
                <Card.Subtitle>Author: {book.authors}</Card.Subtitle>
                <Card.Text className="pt-3">
                  {book.showDescription
                    ? book.description
                    : book.description
                    ? book.description.length > 0
                    ? book.description.slice(0, 0) 
                    : book.description
                    : ""}
                </Card.Text>
                <div className="text-end">
                  {isUserLoggedIn ? (
                    savedBooks.find(
                      (savedBook) => savedBook.bookId === book.bookId
                    ) ? (
                      <Button id="button-card" variant="info" disabled >
                        Book is Saved
                      </Button>
                    ) : (
                      <>
                        <Button
                          id="button-card"
                          variant="info"
                          onClick={() => handleSaveBook(book.bookId)}
                          style={{ marginRight: '10px' }}
                        >
                          Save Book
                        </Button>
                        <Button
                          id="button-more"
                          variant="primary"
                          onClick={() => toggleShowDescription(index)}
                          
                        >
                          {book.showDescription ? "Show Less" : "Show More"}
                        </Button>
                      </>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
        {showPagination && (
        <Pagination
          count={Math.ceil(searchedBooks.length / booksPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          id="custom-pagination"
        />
      )}
      </Container>
    </>
  );
};


export default SearchBooks;
