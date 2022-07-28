import { Job } from "../../interfaces/JobInterfaces";
import React, { MouseEventHandler, ReactElement } from "react";
import { Box, Radio, Typography } from "@mui/material";
import moment from "moment";

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
  const uppercaseFirstLetter = (word: string): string =>
      word.charAt(0).toUpperCase() + word.slice(1),
    uppercaseFirstLetterOfEachWord = (words: string): string =>
      words.toLowerCase().split(" ").map(uppercaseFirstLetter).join(" "),
    formatDate = (date: string): string => moment(date).format("MM.YYYY");

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
          <b>{job.name}</b>
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
