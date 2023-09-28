import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../components/Copyright.jsx';
import LeftSide from '../components/LeftSide.jsx';
import LoginForm from '../components/LoginForm.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';


const defaultTheme = createTheme();

function SignInSide() {

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // for redirecting to home page on successful login
    const navigate = useNavigate();

    // Track changes in input boxes
    const onChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Login logic 
    const loginUser = async (email, password) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                setError(data.message || 'An error occurred. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    // Click Handler
    const onSubmit = e => {
        e.preventDefault();
        loginUser(formData.email, formData.password);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid
                container
                component="main"
                sx={{
                    height: '100vh'
                }}>
                <CssBaseline />

                {/* LeftSide component */}
                <LeftSide />

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    sx={{
                        backgroundColor: '#F4F4F4',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 3,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        mb={2}
                        sx={{
                            fontSize: '2rem',
                            paddingBottom: 1
                        }}>
                        Welcome Back
                    </Typography>

                    {/* Error Message Component */}
                    {error && <ErrorMessage message={error} />}

                    {/* Login Form Component */}
                    <LoginForm formData={formData} onChange={onChange} onSubmit={onSubmit} />

                    {/* Copyright Component */}
                    <Copyright sx={{ mt: 5 }} />

                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

export default SignInSide;
