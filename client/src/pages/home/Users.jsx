import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Users = ({ filteredUsers }) => {
  // אם filteredUsers לא הוגדר, נאתחל אותו כמערך ריק
  const usersToDisplay = filteredUsers || [];

  if (usersToDisplay.length === 0) {
    return <Typography>No users found matching the criteria.</Typography>;
  }

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {usersToDisplay.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card style={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image={user.images[0] || "https://via.placeholder.com/200"}
              alt={user.fullname}
            />
            <CardContent>
              <Typography variant="h6">{user.fullname}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.description}
              </Typography>
              <Typography variant="body2">
                <strong>Professions:</strong> {user.professions.join(", ")}
              </Typography>
              <Typography variant="body2">
                <strong>Hourly Rate:</strong> ${user.hourlyRate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;
