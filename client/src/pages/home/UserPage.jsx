import React, { useState, useEffect } from "react";
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Filters from "./Filters";
import Users from "./Users";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // משיכת נתונים מה-API
    fetch("http://localhost:2000/api/users/allprofessional")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data); // שמירת כל היוזרים
        setFilteredUsers(data); // ברירת המחדל: כל היוזרים
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    
    <Box sx={{
      display: "flex",
     
    }}>
       
      <Filters users={users} setFilteredUsers={setFilteredUsers} />
      <Users filteredUsers={filteredUsers} />
    </Box>
  );
};

export default UserPage;
