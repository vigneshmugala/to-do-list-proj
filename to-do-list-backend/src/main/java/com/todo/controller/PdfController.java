package com.todo.controller;

import com.todo.entity.ToDoItem;
import com.todo.entity.UserEntity;
import com.todo.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
public class PdfController {
    @Autowired
    private ToDoService toDoService;

    @GetMapping(value = "/download-txt/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<byte[]> DownloadTXT(@PathVariable int id) throws IOException {
        List<ToDoItem> toDoItemsList = toDoService.getTodoItemsForaUser(id);
        List<ToDoItem> finishedtoDoItemsList = toDoService.getFinishedToDoItemsForaUser(id);
        String userName = toDoService.getUserNameByUserID(id);
        ByteArrayOutputStream baos = createTXT(toDoItemsList, finishedtoDoItemsList);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("filename", "to_do_items-"+userName+".txt");
        return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
    }

    private ByteArrayOutputStream createTXT(List<ToDoItem> toDoItems, List<ToDoItem> finishedItems) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        StringBuilder sb = new StringBuilder();

        // Add title for todo items
        sb.append("To-Do Items:\n");
        sb.append("---------------------\n");

        // Add todo items
        int itemCount = 1;
        for (ToDoItem item : toDoItems) {
            sb.append(itemCount).append(". ").append(item.getItemName()).append("\n");
            itemCount++;
        }

        sb.append("\n"); // Add a blank line for separation

        // Add finished items
        sb.append("Finished Items:\n");
        sb.append("---------------------\n");
        itemCount = 1;
        for (ToDoItem item : finishedItems) {
            sb.append(itemCount).append(". ").append(item.getItemName()).append("\n");
            itemCount++;
        }

        baos.write(sb.toString().getBytes(StandardCharsets.UTF_8));
        return baos;
    }
}