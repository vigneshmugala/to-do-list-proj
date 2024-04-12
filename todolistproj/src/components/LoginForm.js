import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Card,
    CardContent
} from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/login', { userName, password });
            if (response.status === 200) {
                const userID = response.data;
                const userNameResponse = await axios.get(`http://localhost:8090/getusername/${userID}`);
                const userName = userNameResponse.data;
                navigate('/home', { state: { userID, userName}});
            } else if(response.status === 401){
                setLoginError('Login Failed. Either Username or Password is Wrong');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginError('Either Username or Password is Wrong. Please retry');
            } else {
                setLoginError('Server Problems.. Please try again Sorry.')
            }
        }
    };

    // return (
    //     <div>
    //         <h4>Login into our application</h4>
    //         {loginError && <h1>{loginError}</h1>}
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label htmlFor="userName">Username:</label>
    //                 <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
    //             </div>
    //             <div>
    //                 <label htmlFor="password">Password:</label>
    //                 <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //             </div>
    //             <button type="submit">Log In</button>
    //         </form>

    //         <button onClick={()=> navigate('/signup')}>SignUp</button>
    //     </div>
    return (
      <>
      
        <Container maxWidth="lg">
           <Header/> 
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
                            Login
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            {loginError && (
                                <Typography variant="body1" color="error" gutterBottom>
                                    {loginError}
                                </Typography>
                            )}
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
                                Log In
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Footer/>
        </Container>
        
        </>
    );

};

export default LoginForm;