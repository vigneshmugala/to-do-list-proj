package com.todo.repositorytest;

import com.todo.entity.UserEntity;
import com.todo.repository.UserRepository;
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
public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    private UserEntity user;
    private UserEntity user1;
    private UserEntity user2;

    private List<UserEntity> usersList = new ArrayList<>();

    @Before
    public void setup(){
        user = UserEntity.builder().userName("mugala21").password("ronaldoisgoat").build();
        user1 = UserEntity.builder().userName("hanuman").password("jaishreeram").build();
        user2 = UserEntity.builder().userName("messi").password("fraud").build();

        usersList.add(user1);
        usersList.add(user2);

    }

    @Test
    public void UserRepository_Save_SaveUsersInRepository()
    {
        //Arrange mock behavior
        when(userRepository.save(user)).thenReturn(user);
        //Act
        UserEntity savedUser = userRepository.save(user);
        //Assert
        assertNotNull(savedUser);
        assertEquals(user.getUserID(),savedUser.getUserID());
        assertEquals("mugala21",savedUser.getUserName());
        assertEquals("ronaldoisgoat",savedUser.getPassword());
    }
    @Test
    public void UserRepository_FindAll_FindAllUsersInRepository()
    {
        //Arrange mock behavior
        when(userRepository.findAll()).thenReturn(usersList);
        //Act
        List<UserEntity> newUsersList = userRepository.findAll();
        //Assert
        assertNotNull(newUsersList);
        assertEquals(newUsersList.size(),usersList.size());
        assertEquals(2,newUsersList.size());
        assertEquals(newUsersList.get(0).getUserID(),usersList.get(0).getUserID());
        assertEquals(newUsersList.get(1).getUserID(), usersList.get(1).getUserID());
    }
    @Test
    public void UserRepository_FindById_FindByIDUserInRepository()
    {
        //Arrange mock behavior
        when(userRepository.findById(user.getUserID())).thenReturn(Optional.ofNullable(user));
        //Act
        Optional<UserEntity> returnedUser = userRepository.findById(user.getUserID());
        //Assert
        assertNotNull(returnedUser);
        assertNotNull(returnedUser.get());
        assertEquals(returnedUser.get().getUserID(),user.getUserID());
        assertEquals("mugala21",returnedUser.get().getUserName());
        assertEquals("ronaldoisgoat",returnedUser.get().getPassword());
    }
}
