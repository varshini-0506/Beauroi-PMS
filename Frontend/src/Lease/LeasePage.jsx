import React from "react";
import LeaseManagement from "./LeaseManagement"; 
import { SnackbarProvider } from "notistack";

function LeasePage() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <LeaseManagement />
    </SnackbarProvider>
  );
}

export default LeasePage;
