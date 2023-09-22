import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignupForm from './SignupForm'; // Add this import statement

const defaultTheme = createTheme();

const CombinedForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false); // Add state for showing signup form
  const [login, { error, data }] = useMutation(LOGIN);

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
            {showSignupForm ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
           
            {!showSignupForm ? (
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
               <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="login-form-button"
              id='login-button'
              disabled={!(userFormData.email && userFormData.password)}
            >
              Sign In 
              </Button>
                 </Form.Group>
              </>
            ) : (
              <SignupForm /> 
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
           
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2" padding={1}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="#" variant="body2" onClick={toggleSignupForm} padding={3}>
                  {showSignupForm ? 'Back to Sign In' : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
      </Container>
    </ThemeProvider>
  );
};

export default CombinedForm;