import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    try {
      console.log('Submitting user data:', userFormData); // Debugging: Log user data
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log('Response data:', data); // Debugging: Log response data
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
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
        
          <Form noValidate validated={validated} onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
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
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              className="login-form-button"
              disabled={!(userFormData.email && userFormData.password)}
            >
               Sign Up {/* Dynamically change button label */}
            </Button>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
