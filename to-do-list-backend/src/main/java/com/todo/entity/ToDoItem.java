package com.todo.entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
public class ToDoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    private String itemName;

    private boolean itemStatus;

    private int userIDref;
}
