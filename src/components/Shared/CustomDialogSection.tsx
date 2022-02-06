import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  columnsGrid: string;
  children: JSX.Element[] | JSX.Element;
}

const CustomDialogSection: React.FC<Props> = ({
  title,
  columnsGrid,
  children,
}) => {
  return (
    <Box sx={{ color: "#6B636B" }}>
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontWeight: "700",
          textTransform: "uppercase",
          color: "#6B636B",
          my: "16px",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: columnsGrid }}>
        {children}
      </Box>
    </Box>
  );
};

export default CustomDialogSection;
