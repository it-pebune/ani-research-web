import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React from "react";

interface Props {
  onSearchChanged: (string: string) => void;
  onFiltersOpen?: React.MouseEventHandler<HTMLButtonElement>;
}

const SearchBarWithFiltersController: React.FC<Props> = ({
  onSearchChanged,
  onFiltersOpen,
}) => {
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onSearchChanged((e.target as HTMLInputElement).value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "4px 16px",
        background: "#ededed",
        display: "flex",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Icon>search</Icon>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Cauta in lista"
        inputProps={{ "aria-label": "search-field" }}
        onKeyUp={handleSearch}
      />

      {onFiltersOpen && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={onFiltersOpen}
          >
            <Icon>tune</Icon>
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default SearchBarWithFiltersController;
