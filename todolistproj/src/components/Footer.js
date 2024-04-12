import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="sticky" color="primary" sx={{ bottom: 0 }}>
            <Toolbar>
                <Typography variant="body2" color="inherit" align="center">
                    &copy; 2024 To-Do-List Hero
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;