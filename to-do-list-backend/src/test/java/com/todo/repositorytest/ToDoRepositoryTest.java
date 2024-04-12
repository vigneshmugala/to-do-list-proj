package com.todo.repositorytest;


import com.todo.entity.ToDoItem;
import com.todo.repository.ToDoRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ToDoRepositoryTest {

    @Mock
    private ToDoRepository toDoRepository;

    private ToDoItem todoItem;
    private ToDoItem todoItem1;
    private ToDoItem todoItem2;

    private List<ToDoItem> toDoItemsList = new ArrayList<>();


    @Before
    public void setup(){
        //Arrange
        todoItem = ToDoItem.builder().itemName("Play Cricket").itemStatus(false).userIDref(2).build();
        todoItem1 = ToDoItem.builder().itemName("Play Football").itemStatus(true).userIDref(1).build();
        todoItem2 = ToDoItem.builder().itemName("Play Baseball").itemStatus(false).userIDref(3).build();

        toDoItemsList.add(todoItem1);
        toDoItemsList.add(todoItem2);
    }

    @Test
    public void ToDoRepository_save_TestSaveToDoItem()
    {
        //Arrange mock behavior
        when(toDoRepository.save(todoItem)).thenReturn(todoItem);
        //Act
        ToDoItem savedToDoItem = toDoRepository.save(todoItem);
        //Assert
        assertNotNull(savedToDoItem);
        assertEquals("Play Cricket",savedToDoItem.getItemName());
        assertFalse(savedToDoItem.isItemStatus());
        assertEquals(2,savedToDoItem.getUserIDref());

    }

    @Test
    public void ToDoRepository_findAll_TestFindAllToDoItems()
    {
        //Arrange mock behavior
        when(toDoRepository.findAll()).thenReturn(toDoItemsList);
        //Act
        toDoRepository.save(todoItem1);
        toDoRepository.save(todoItem2);
        List<ToDoItem> allToDoItems = toDoRepository.findAll();
        //Assert
        assertNotNull(allToDoItems);
        assertEquals(2,allToDoItems.size());
    }

    @Test
    public void ToDoRepository_findById_TestFindByIdToDoItems()
    {
        //Arrange Mock behavior
        when(toDoRepository.findById(todoItem.getItemId())).thenReturn(Optional.ofNullable(todoItem));
        //Act
        Optional<ToDoItem> returnedItem = toDoRepository.findById(todoItem.getItemId());
        //Assert
        assertNotNull(returnedItem);
        assertNotNull(returnedItem.get());
        assertEquals(todoItem.getItemId(),returnedItem.get().getItemId());
        assertEquals("Play Cricket",returnedItem.get().getItemName());
        assertFalse(returnedItem.get().isItemStatus());
        assertEquals(2,returnedItem.get().getUserIDref());
    }

}
