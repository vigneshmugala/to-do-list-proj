import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

const AddItemModal = ({ open, onClose, userID, onItemAdded }) => {
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
                onClose();
            }
        } catch (e) {
            console.error('Error Caught while calling /itemadd', e);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Add New Item</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemName"
                        label="Item Name"
                        type="text"
                        fullWidth
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Item
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AddItemModal;