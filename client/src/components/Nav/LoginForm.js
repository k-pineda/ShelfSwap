import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import SignupForm from './SignupForm'; // Add this import statement

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

const CombinedForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
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

  const toggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {showSignupForm ? 'Sign up' : 'Sign in'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleFormSubmit}>
            {/* Login Form */}
            {showSignupForm ? null : (
              <>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='email'>Email</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Your email'
                    name='email'
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                    className="login-form-input"
                  />
                  <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
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
                    className="login-form-input"
                  />
                  <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="login-form-button"
                  disabled={!(userFormData.email && userFormData.password)}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={toggleSignupForm} padding={3}>
                {showSignupForm ? 'Back to Sign In' : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        {showSignupForm && (
          <SignupForm /> 
        )};
      </Container>
    </ThemeProvider>
  );
};

export default CombinedForm;
