import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./api";
import Dashboard from "./pages/dashboard";
import { Toolbar, Box } from "@mui/material";

function App() {
  return (
    <ApiProvider api={api}>
      <Box sx={{ padding: 2 }}>
        <Toolbar />
        <Dashboard />
      </Box>
    </ApiProvider>
  );
}

export default App;
