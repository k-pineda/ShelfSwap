import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_SAVED_BOOKS } from '../utils/queries';
import { CREATE_CHAT } from '../utils/mutations'
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import jwt_decode from 'jwt-decode';

function Swap() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_ALL_SAVED_BOOKS);
  const [createChat] = useMutation(CREATE_CHAT);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const allSavedBooks = data.books || [];

  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.data._id;

  const handleAskToSwap = async (receiverId) => {
    try {
      console.log(receiverId)
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
        <Row>
          {allSavedBooks.map((book) => (
            <Col key={book._id} md="4">
              <Card>
                <Card.Img src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle>Authors: {book.authors}</Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    onClick={() => handleAskToSwap(book.owner._id)}
                  >
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
