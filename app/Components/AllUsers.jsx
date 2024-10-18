"use client";
import {ListItem, Card, List } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

function AllUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const result = await fetch("http://localhost:3000/api/users");
      const data = await result.json();
      setUsers(data.data);
    };
    getUsers();
  }, []);
  return <div>
    { users && users.map((user)=>(
        <List key={user.id}>
            <ListItem>{user.name}</ListItem>
        </List>
    ))}
  </div>;
}

export default AllUsers;
