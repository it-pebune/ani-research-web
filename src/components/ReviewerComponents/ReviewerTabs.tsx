import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";

interface Props {
  view: string;
  subject?: SubjectFromDataBase;
  onViewChange: any;
}

const ReviewerTabs: React.FC<Props> = ({ subject, view, onViewChange }) => {
  const handleChange = (event: any, newValue: string) => {
    onViewChange(newValue);
  };

  useEffect(() => {
    console.log(subject);
  }, [subject]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 100px 250px" }}>
      <Tabs value={view} onChange={handleChange}>
        <Tab value={"list"} id="my-subjects" label="Subiectii mei"></Tab>
        <Tab value={"loaded-docs"} label="Documente incarcate"></Tab>
        <Tab
          value={"scrapper-docs"}
          id="my-subjects"
          label="Documente disponibile"
        ></Tab>
      </Tabs>
      <img
        src={subject?.photoUrl}
        style={{ height: "50px", width: "auto", margin: "0 auto" }}
      ></img>
      <Typography
        sx={{
          color: "white",
          fontSize: "18px",
          fontWeight: "700",
          background: "green",
          verticalAlign: "middle",
          textAlign: "center",
          p: "8px",
        }}
      >
        {subject?.firstName} {subject?.lastName}
      </Typography>
    </Box>
  );
};

export default ReviewerTabs;
