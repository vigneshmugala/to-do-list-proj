package com.todo.controller;

import com.todo.entity.ToDoItem;
import com.todo.entity.UserEntity;
import com.todo.service.ToDoService;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping("/todoitems")
    public List<ToDoItem> getAllTodoItems()
    {
       return toDoService.getAllTodoItems();
    }

    @GetMapping("/users")
    public List<String> getAllUsers(){
        return toDoService.getAllUserNames();
    }

    @GetMapping("/users/{id}") // RETURNS ALL unchecked Items for a User
    public List<ToDoItem> getAllToDoItemsForaUser(@PathVariable int id)
    {
        return toDoService.getTodoItemsForaUser(id);
    }

    @GetMapping("/finisheditems/{id}") //RETURNS ALL checked Items for a User
    public List<ToDoItem> getAllFinishedToDoItemsForaUser(@PathVariable int id){return toDoService.getFinishedToDoItemsForaUser(id);}

    @PostMapping("/signup")
    public ResponseEntity<String> addNewUser(@RequestBody UserEntity userEntity) {
        String response = toDoService.addNewUser(userEntity);
        if (response.equals("User Added Successfully!")) {
            return ResponseEntity.ok(response);
        } else if (response.equals("User Already Exists!")) {
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during signup.");
        }
    }

    @PostMapping("/itemadd")
    public ToDoItem addNewItem(@RequestBody ToDoItem toDoItem)
    {
        return toDoService.addNewToDoItem(toDoItem);
    }

    @PostMapping("/login")
    public ResponseEntity<Integer> login(@RequestBody UserEntity userEntity) {
        UserEntity authenticatedUser = toDoService.getUserByBody(userEntity);
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser.getUserID());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(-2147483648);
        }
    }

    @GetMapping("/getusername/{id}")
    public ResponseEntity<String> getUserNameByUserID(@PathVariable int id)
    {
        String response = toDoService.getUserNameByUserID(id);
        if(response.equals("Failure"))
        {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateitem/{id}")
    public int updateItemStatusByItemId(@PathVariable int id)
    {
        return toDoService.updateItemStatusByItemId(id);
    }

    @PutMapping("/updatename/{id}")
    public ResponseEntity<String> updateItemNameByItemId(@PathVariable int id , @RequestBody ToDoItem itemName){
        String response = toDoService.updateItemNameByItemId(id, itemName.getItemName());
        if(response.equals("Success")){
            return ResponseEntity.ok(response);
        }
        else if(response.equals("Failure")){
            return ResponseEntity.badRequest().body(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured while Editing.");
        }
    }


    @DeleteMapping("/deleteitem/{id}")
    public ResponseEntity<String> deleteItemWithItemID(@PathVariable int id)
    {
        String response = toDoService.deleteItemWithItemID(id);
        if(response.equals("Success")){
            return ResponseEntity.ok(response);
        }
        else if(response.equals("Failure")){
            return ResponseEntity.badRequest().body(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured while Deleting..");
        }
    }
}
