import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ToDoItem from './ToDoItem';
import AddItemModal from './AddItemModal';
import DeleteItemModal from './DeleteItemModal';
import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
    Card
} from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userID = location.state?.userID;
    const userName = location.state?.userName;
    const [unfinishedItems, setUnfinishedItems] = useState([]);
    const [finishedItems, setFinishedItems] = useState([]);
    const [addNewClicked, setAddNewClicked] = useState(false);
    
    // const [editItemModal, setEditItemModal] = useState(null);
    const [deleteItemModal, setDeleteItemModal] = useState(null);


    const [finishedItemClicked, setFinishedItemClicked] = useState(false);

    const fetchUserData = async () => {
        try {
            const [unfinishedResponse, finishedResponse] = await Promise.all([
                axios.get(`http://localhost:8090/users/${userID}`),
                axios.get(`http://localhost:8090/finisheditems/${userID}`),
            ]);
            setUnfinishedItems(unfinishedResponse.data);
            setFinishedItems(finishedResponse.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // useEffect(() => {
    //     if (userID) {
    //         fetchUserData();
    //     }
    // }, [userID, fetchUserData]);

    useEffect(() => {
        if (userID) {
            const fetchData = async () => {
                try {
                    const [unfinishedResponse, finishedResponse] = await Promise.all([
                        axios.get(`http://localhost:8090/users/${userID}`),
                        axios.get(`http://localhost:8090/finisheditems/${userID}`),
                    ]);
                    setUnfinishedItems(unfinishedResponse.data);
                    setFinishedItems(finishedResponse.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            fetchData();
        }
    }, [userID]);



    const handleOnClick = (e) => {
        navigate('/login', { replace: true });
    };

    const handleOnAddItem = (e) => {
        setAddNewClicked(true);
    };

    const handleOnItemAdded = (e) => {
        fetchUserData();
    };

    const handleOnFinishedItems = (e) => {
        setFinishedItemClicked(!finishedItemClicked);
    };

    const handleItemStatusChange = async (itemId) => {
        try {
            const response = await axios.put(`http://localhost:8090/updateitem/${itemId}`);
            if (response.data === 1) {
                fetchUserData();
            } else {
                console.log("Item with itemID not found");
            }
        } catch (error) {
            console.error("Error occurred while calling API");
        }
    };
    
    const handleEditItem = async (itemId, newItemName) => {
        try {
            const response = await axios.put(`http://localhost:8090/updatename/${itemId}`, { itemName: newItemName });
            if (response.status === 200) {
                fetchUserData();
            }
        } catch (error) {
            console.error('Error updating item name:', error);
        }
    };
    
    const handleDeleteItem = async (itemId) => {
        setDeleteItemModal(itemId);
    };
    
    const handleConfirmDelete = async (itemId) => {
        try {
            const response = await axios.delete(`http://localhost:8090/deleteitem/${itemId}`);
            if (response.status === 200) {
                fetchUserData();
                setDeleteItemModal(null);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const  handleOnDownload = async (e) => {
        try{
            const response =  await axios.get(`http://localhost:8090/download-txt/${userID}`, {responseType: 'blob',});
            const url =  window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const fileName = 'to_do_items -'+userName+'.txt';
            link.setAttribute('download',fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch(error){
            if(error.response && error.response.status === 500){
                console.log("Error Occured while downloading");
            }
        }
    };
    
   

    return (
        <Container maxWidth="lg">
            <Header onSignOut={handleOnClick}/>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                    Welcome, {userName}!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    User ID: {userID}
                </Typography>
                <Box sx={{ my: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOnAddItem}
                    >
                        ADD TO-DO ITEM
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleOnFinishedItems}
                        sx={{ ml: 2 }}
                    >
                        FINISHED ITEMS
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ color: 'black', border: '2px solid green', borderRadius: '5px', textTransform: 'none', ml:2 }}
                      startIcon={<DownloadForOfflineIcon />}
                      onClick={handleOnDownload}
                    >
                          DOWNLOAD
                    </Button>
                </Box>
                <Typography variant="h5" gutterBottom>
                    TO-DO Items
                </Typography>
            {unfinishedItems.map((item) => (
                    <ToDoItem
                        key={item.itemId}
                        itemId={item.itemId}
                        itemName={item.itemName}
                        itemStatus={item.itemStatus}
                        handleItemStatusChange={handleItemStatusChange}
                        handleEditItem={handleEditItem}
                        handleDeleteItem={handleDeleteItem}
                    
                    />
                ))}
                {addNewClicked && (
                <AddItemModal
                    open={addNewClicked}
                    onClose={() => setAddNewClicked(false)}
                    userID={userID}
                    onItemAdded={handleOnItemAdded}
                />
            )}
            {deleteItemModal && (
       <DeleteItemModal
           open={true}
           onClose={() => setDeleteItemModal(null)}
           onConfirm={() => handleConfirmDelete(deleteItemModal)}
        />
       )}

            
            </Paper>
    
            {finishedItemClicked && (
                <Card elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Finished To-Do Items
                    </Typography>
                    {finishedItems.map((item) => (
                        <ToDoItem
                            key={item.itemId}
                            itemId={item.itemId}
                            itemName={item.itemName}
                            itemStatus={item.itemStatus}
                            handleItemStatusChange={handleItemStatusChange}
                            handleEditItem={handleEditItem} 
                            handleDeleteItem={handleDeleteItem}
                        />
                    ))}
                </Card>
            )}
    
            <Footer />
        </Container>
    );



    // return (
    //     <>
    //     <Header/>
    //     <Container maxWidth="md">
    //         <Box
    //             sx={{
    //                 display: 'flex',
    //                 justifyContent: 'flex-end',
    //                 mb: 2,
    //             }}
    //         >
    //             <Button
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={handleOnClick}
    //             >
    //                 SIGN OUT
    //             </Button>
    //         </Box>
    //         <Paper elevation={3} sx={{ p: 3 }}>
    //             <Typography variant="h4" gutterBottom>
    //                 Welcome
    //             </Typography>
    //             <Typography variant="subtitle1" gutterBottom>
    //                 User ID: {userID}
    //             </Typography>
    //             <Box sx={{ my: 2 }}>
    //                 <Button
    //                     variant="contained"
    //                     color="primary"
    //                     onClick={handleOnAddItem}
    //                 >
    //                     ADD TO-DO ITEM
    //                 </Button>
    //                 <Button
    //                     variant="outlined"
    //                     color="primary"
    //                     onClick={handleOnFinishedItems}
    //                     sx={{ ml: 2 }}
    //                 >
    //                     FINISHED ITEMS
    //                 </Button>
    //             </Box>
    //             <Typography variant="h5" gutterBottom>
    //                 TO-DO Items
    //             </Typography>
    //             {unfinishedItems.map((item) => (
    //                 <ToDoItem
    //                     key={item.itemId}
    //                     itemId={item.itemId}
    //                     itemName={item.itemName}
    //                     itemStatus={item.itemStatus}
    //                     handleItemStatusChange={handleItemStatusChange}
    //                 />
    //             ))}
    //         </Paper>

    //         {addNewClicked && (
    //             <Box sx={{ mt: 4 }}>
    //                 <AddItemForm userID={userID} onItemAdded={handleOnItemAdded} />
    //             </Box>
    //         )}

    //         {finishedItemClicked && (
    //             <Box sx={{ mt: 4 }}>
    //                 <Typography variant="h5" gutterBottom>
    //                     Finished To-Do Items
    //                 </Typography>
    //                 {finishedItems.map((item) => (
    //                     <ToDoItem
    //                         key={item.itemId}
    //                         itemId={item.itemId}
    //                         itemName={item.itemName}
    //                         itemStatus={item.itemStatus}
    //                         handleItemStatusChange={handleItemStatusChange}
    //                     />
    //                 ))}
    //             </Box>
    //         )}
    //     </Container>
    //     <Footer/>
    //     </>
    // );
    // return (
    //     <div>
    //         <button onClick={handleOnClick}>SIGN OUT</button>
    //         <button onClick={handleOnAddItem}>ADD TO-DO ITEM</button>
    //         <button onClick={handleOnFinishedItems}>FINISHED ITEMS</button>
    //         <h1>Welcome</h1>
    //         <p>User ID: {userID}</p>

    //         <div>
    //             <h2>TO-do-Items</h2>
    //             {unfinishedItems.map((item) => (
    //                 <ToDoItem
    //                     key={item.itemId}
    //                     itemId={item.itemId}
    //                     itemName={item.itemName}
    //                     itemStatus={item.itemStatus}
    //                     handleItemStatusChange={handleItemStatusChange}
    //                 />
    //             ))}
    //         </div>

    //         {addNewClicked === true && (
    //             <div>
    //                 <AddItemForm userID={userID} onItemAdded={handleOnItemAdded} />
    //             </div>
    //         )}

    //         {finishedItemClicked === true && (
    //             <div>
    //                 <h2>Finished To-Do-Items</h2>
    //                 {finishedItems.map((item) => (
    //                     <ToDoItem
    //                         key={item.itemId}
    //                         itemId={item.itemId}
    //                         itemName={item.itemName}
    //                         itemStatus={item.itemStatus}
    //                         handleItemStatusChange={handleItemStatusChange}
    //                     />
    //                 ))}
    //             </div>
    //         )}
    //     </div>
    // );
};

export default HomePage;