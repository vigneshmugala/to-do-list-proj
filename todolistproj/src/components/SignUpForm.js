import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Snackbar,
    CardContent,
    Card
} from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/signup', {
                userName,
                password,
            });
            if (response.status === 200) {
                setSuccessMessage('Sign Up successful! Now Login!');
                setErrorMessage(null);
            } else if (response.status === 400) {
                setErrorMessage('This Username already exists! Try another one');
                setSuccessMessage(null);
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
                setSuccessMessage(null);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('This Username already exists! Try another one');
                setSuccessMessage(null);
            } else {
                setErrorMessage('Server Problems.. Please be patient!');
                setSuccessMessage(null);
            }
        }
    };

    return (
        <>
            <Container maxWidth="lg">
                <Header />
                <Card variant="outlined" sx={{ mt: 8 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    name="userName"
                                    autoComplete="userName"
                                    autoFocus
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {successMessage && (
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        onClose={() => setSuccessMessage(null)}
                        message={successMessage}
                    />
                )}
                {errorMessage && (
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        onClose={() => setErrorMessage(null)}
                        message={errorMessage}
                    />
                )}
                <Footer />
            </Container>
        </>
    );
};

export default SignUpForm;