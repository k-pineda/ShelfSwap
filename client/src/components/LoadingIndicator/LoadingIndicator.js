import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingIndicator = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;