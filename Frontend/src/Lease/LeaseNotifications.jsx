import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Button, Divider, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeaseNotifications = () => {
  const navigate = useNavigate();

  // Default notifications
  const notifications = [
    { message: "Reminder: Lease Renewal Due in 7 Days", time: "2024-03-15 10:00 AM" },
    { message: "Lease Terminated: Property at 123 Main St", time: "2024-03-10 12:00 PM" },
    { message: "Reminder: Lease Payment Due Today", time: "2024-03-10 08:00 AM" },
    { message: "Renewal Notice: Lease Expiring in 30 Days", time: "2024-03-05 02:00 PM" },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 4, bgcolor: "#f0f0f0", height: "100vh", overflowY: "auto" }}>
      <Paper elevation={3} sx={{ maxWidth: 800, width: "100%", margin: "auto", p: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
              Lease Notifications 🔔
            </Typography>
          </Grid>

          {/* Back Button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={() => console.log("Clear All clicked")} variant="contained" color="error">
              Clear All
            </Button>
          </Grid>

          {/* Notifications List */}
          <Grid item xs={12}>
            {notifications.length > 0 ? (
              <List>
                {notifications.map((note, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText primary={note.message} secondary={`Time: ${note.time}`} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography align="center" sx={{ py: 4 }}>
                No notifications available.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LeaseNotifications;
