package com.todo.service;

import com.todo.entity.ToDoItem;
import com.todo.entity.UserEntity;
import com.todo.repository.ToDoRepository;
import com.todo.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {
    @Autowired
    private ToDoRepository toDoRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ToDoItem> getAllTodoItems()
    {
        return toDoRepository.findAll();
    }

    public List<String> getAllUserNames()
    {
        List<String> userNames = new ArrayList<String>();
        List<UserEntity> allUsers = userRepository.findAll();
        for(UserEntity us: allUsers)
        {
            userNames.add(us.getUserName());
        }
        return userNames;
    }

    //return a List of all TodoItems with a given userID

    public List<ToDoItem> getTodoItemsForaUser(int userId)
    {
        List<ToDoItem> allToDos = toDoRepository.findAll();
        List<ToDoItem> requiredToDos = new ArrayList<ToDoItem>();
        for(ToDoItem item: allToDos)
        {
            if(item.getUserIDref() == userId && !item.isItemStatus())
            {
                requiredToDos.add(item);
            }
        }
        return requiredToDos;
    }
   public List<ToDoItem> getFinishedToDoItemsForaUser (int userId)
   {
       List<ToDoItem> allToDos = toDoRepository.findAll();
       List<ToDoItem> finishedToDos = new ArrayList<>();
       for(ToDoItem toDoItem: allToDos)
       {
           if(toDoItem.getUserIDref() == userId && toDoItem.isItemStatus())
           {
               finishedToDos.add(toDoItem);
           }
       }
       return finishedToDos;
   }
    public String addNewUser(UserEntity userEntity)
    {
        Optional<UserEntity> user = userRepository.findByUserName(userEntity.getUserName());
        if (user.isPresent()) {
            return "User Already Exists!";
        } else {
            UserEntity newUser = new UserEntity();
            newUser.setUserName(userEntity.getUserName());
            newUser.setPassword(userEntity.getPassword());
            userRepository.save(newUser);
            return "User Added Successfully!";
        }

    }

    public ToDoItem addNewToDoItem(ToDoItem toDoItem)
    {
         return toDoRepository.save(toDoItem);
    }

    public UserEntity getUserByBody(UserEntity userToFind)
    {
        Optional<UserEntity> userFound = userRepository.findByUserName(userToFind.getUserName());
        if (userFound.isPresent()) {
            UserEntity foundUser = userFound.get();
            if (foundUser.getPassword().equals(userToFind.getPassword())) {
                return foundUser;
            }
        }
        return null;
    }

    public int updateItemStatusByItemId(int itemId)
    {
        Optional<ToDoItem> item = toDoRepository.findById(itemId);
        if(item.isPresent())
        {
            ToDoItem todoItem = item.get();
            todoItem.setItemStatus(!todoItem.isItemStatus());
            toDoRepository.save(todoItem);
            return 1;
        }
        else{
            return 6989;
        }
    }

    public String updateItemNameByItemId(int itemId, String newItemName)
    {
        Optional<ToDoItem> item = toDoRepository.findById(itemId);
        if(item.isPresent())
        {
            ToDoItem todoitem = new ToDoItem();
            todoitem.setItemId(itemId);
            todoitem.setItemName(newItemName);
            todoitem.setItemStatus(item.get().isItemStatus());
            todoitem.setUserIDref(item.get().getUserIDref());
            toDoRepository.save(todoitem);
            return "Success";
        }
        return "Failure";
    }

    public String deleteItemByItemId(ToDoItem itemToBeDeleted)
    {
        Optional<ToDoItem> item = toDoRepository.findById(itemToBeDeleted.getItemId());
        if(item.isPresent())
        {
            //delete item
            toDoRepository.delete(itemToBeDeleted);
            return "Succesfully Deleted";
        }
        return "Failure";
    }


    public String deleteItemWithItemID(int itemId)
    {
        Optional<ToDoItem> item = toDoRepository.findById(itemId);
        if(item.isPresent())
        {
            toDoRepository.delete(item.get());
            return "Success";
        }
        return "Failure";
    }

    public String getUserNameByUserID(int userID)
    {
        Optional<UserEntity> userToFind = userRepository.findById(userID);
        if(userToFind.isPresent())
        {
            return userToFind.get().getUserName();
        }
        return "Failure";
    }



}
