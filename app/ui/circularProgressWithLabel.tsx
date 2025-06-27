import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";
import SunnyIcon from "@mui/icons-material/Sunny";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SunnyIcon />
      </Box>
    </Box>
  );
}
