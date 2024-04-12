import { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';

const AddItemForm = ({ userID, onItemAdded }) => {
    const [itemName, setItemName] = useState('');
    const itemStatus = false;
    const userIDref = userID;
    const bodyToSend = {
        itemName,
        itemStatus,
        userIDref,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8090/itemadd',
                bodyToSend
            );
            console.log('API called, item is added successfully');
            if (response.status === 200) {
                onItemAdded();
                setItemName('');
            }
        } catch (e) {
            console.error('Error Caught while calling /itemadd', e);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, mx: 'auto' }}>
            <TextField
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Item
            </Button>
        </Box>
    );
};

export default AddItemForm;