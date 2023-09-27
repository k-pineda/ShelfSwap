import React, { useState, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const SignupForm = () => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const formRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  const handleSignup = async () => {
    const form = formRef.current;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });
        Auth.login(data.addUser.token);

        navigate('/home');

      } catch (err) {
        console.error(err);
      }
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
      setValidated(false);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Form
            ref={formRef}
            noValidate
            validated={validated}
            onSubmit={(e) => e.preventDefault()} 
            sx={{ mt: 3 }}
          >
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='username'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your username'
                name='username'
                onChange={handleInputChange}
                value={userFormData.username}
                required
                className='signup-form-input'
              />
              <Form.Control.Feedback type='invalid'>
                Username is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email address'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
                className='signup-form-input'
              />
              <Form.Control.Feedback type='invalid'>
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
                className='signup-form-input'
              />
              <Form.Control.Feedback type='invalid'>
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <button
            onClick={handleSignup} 
            className='btn '
            id='button'
          >
            Sign Up
          </button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignupForm;
