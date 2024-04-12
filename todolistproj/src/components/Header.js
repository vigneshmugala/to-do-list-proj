import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onSignOut }) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ToDoHero
                </Typography>
                <Button sx={{ color: 'white', backgroundColor: 'black' }} onClick={onSignOut}>Sign Out</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
