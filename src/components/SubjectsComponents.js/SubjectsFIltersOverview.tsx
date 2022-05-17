import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubjectFilters } from "../../interfaces/SubjectInterfaces";

interface Props {
  filters: SubjectFilters | undefined;
  onFiltersChanged: any;
}

const SubjectsFIltersOverview: React.FC<Props> = ({
  filters,
  onFiltersChanged,
}) => {
  const [hasFilters, setHasFilters] = useState(false);

  const handleClearStatus = () => {
    const newFilters = {
      ...filters,
      statusFilters: [],
    };
    onFiltersChanged(newFilters);
  };

  const handleClearRoles = () => {
    const newFilters = {
      ...filters,
      roleFilters: [],
    };
    onFiltersChanged(newFilters);
  };

  const handleClearPeriod = () => {
    const newFilters = {
      ...filters,
      lastDateFilter: { logged: null, period: "" },
    };
    onFiltersChanged(newFilters);
  };

  const handleClearAll = () => {
    onFiltersChanged({
      statusFilters: [],
      roleFilters: [],
      lastDateFilter: { logged: null, period: "" },
    });
  };

  useEffect(() => {}, [filters]);

  return (
    <Box
      sx={{
        height: "50px",
        boxSizing: "border-box",
        alignItems: "center",
        display: hasFilters ? "flex" : "none",
        padding: "0 24px",
      }}
    ></Box>
  );
};

export default SubjectsFIltersOverview;
