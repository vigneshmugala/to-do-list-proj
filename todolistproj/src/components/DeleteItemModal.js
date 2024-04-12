import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const DeleteItemModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogContent>
                <DialogContentText>Do you really want to delete this item?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteItemModal;