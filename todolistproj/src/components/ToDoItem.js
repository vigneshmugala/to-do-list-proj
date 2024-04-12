import React, { useState } from 'react';
import { Checkbox, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ToDoItem = ({ itemId, itemName, itemStatus, handleItemStatusChange, handleEditItem, handleDeleteItem }) => {
    const [editMode, setEditMode] = useState(false);
    const [newItemName, setNewItemName] = useState(itemName);

    const handleOnChange = () => {
        handleItemStatusChange(itemId);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSaveEdit = () => {
        handleEditItem(itemId, newItemName);
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setNewItemName(itemName);
    };

    const handleDelete = () => {
        handleDeleteItem(itemId);
    };

    return (
        <ListItem
            secondaryAction={
                <React.Fragment>
                    {editMode ? (
                        <>
                            <IconButton onClick={handleSaveEdit} aria-label="save">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleCancelEdit} aria-label="cancel">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={handleEdit} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleDelete} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )}
                    
                </React.Fragment>
            }
            sx={{
                boxShadow: 1,
                borderRadius: 1,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3,
                },
            }}
        >
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                <Checkbox checked={itemStatus} onChange={handleOnChange} disableRipple />
            </ListItemIcon>
            {editMode ? (
                <TextField
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    autoFocus
                />
            ) : (
                <ListItemText primary={itemName} />
            )}
        </ListItem>
    );
};

export default ToDoItem;