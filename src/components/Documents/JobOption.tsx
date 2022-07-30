import { Job } from "../../interfaces/JobInterfaces";
import React, { MouseEventHandler, ReactElement, useState } from "react";
import {
  Box,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import moment from "moment";
import { MouseEvent } from "react";

interface Props {
  job: Job;
  checked: boolean;
  handleRadioClick: MouseEventHandler;
}

export const JobOption: React.FC<Props> = ({
  job,
  checked,
  handleRadioClick,
}: Props): ReactElement => {
  const [menuAnchorElement, setMenuAnchorElement] = useState<Element | null>(
    null
  );

  const uppercaseFirstLetter = (word: string): string =>
      word.charAt(0).toUpperCase() + word.slice(1),
    uppercaseFirstLetterOfEachWord = (words: string): string =>
      words.toLowerCase().split(" ").map(uppercaseFirstLetter).join(" "),
    formatDate = (date: string): string => moment(date).format("MM.YYYY");

  const openMenu = (event: MouseEvent): void =>
      setMenuAnchorElement(event.currentTarget),
    closeMenu = (): void => setMenuAnchorElement(null);

  return (
    <Box
      key={job.id}
      sx={{
        px: "16px",
        display: "grid",
        gridTemplateColumns: "60px 1fr",
      }}
    >
      <Radio value={job.id} checked={checked} onClick={handleRadioClick} />

      <Box>
        <Typography variant="body1">
          <b>{job.name}</b>{" "}
          <IconButton
            id={`long-button-${job.id}`}
            aria-label="more"
            aria-controls={!!menuAnchorElement ? "long-menu" : undefined}
            aria-expanded={!!menuAnchorElement ? "true" : undefined}
            aria-haspopup="true"
            onClick={openMenu}
          >
            <Icon>more_horizontal</Icon>
          </IconButton>
          <Menu
            id={`long-menu-${job.id}`}
            anchorEl={menuAnchorElement}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={!!menuAnchorElement}
            onClose={closeMenu}
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            PaperProps={{
              style: {
                maxHeight: "auto",
                width: "100px",
                transform: "translateY(-10px)",
              },
            }}
          >
            <MenuItem key="edit">Editeaza</MenuItem>

            <MenuItem key="delete">Sterge</MenuItem>
          </Menu>
        </Typography>

        <Typography variant="body2">
          {uppercaseFirstLetterOfEachWord(job.institution) +
            " " +
            uppercaseFirstLetterOfEachWord(job.uat)}
        </Typography>

        <Typography variant="body2">
          {formatDate(job.dateStart) +
            " - " +
            (job.dateEnd ? formatDate(job.dateEnd) : "prezent")}
        </Typography>
      </Box>
    </Box>
  );
};
