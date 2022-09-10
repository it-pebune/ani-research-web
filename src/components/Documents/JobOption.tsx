import { Job } from "../../interfaces/JobInterfaces";
import React, { MouseEventHandler, ReactElement, useState } from "react";
import {
  Alert,
  Box,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Snackbar,
  Typography,
} from "@mui/material";
import moment from "moment";
import { MouseEvent } from "react";
import CustomDialog from "../Shared/CustomDialog";
import useTokenStatus from "../../utils/useTokenStatus";
import { jobService } from "../../services/jobsService";

interface Props {
  job: Job;
  checked: boolean;
  handleRadioClick: MouseEventHandler;
  onEdit: (job: Job) => void;
  onDeleteSuccess: (job: Job) => void;
}

export const JobOption: React.FC<Props> = ({
  job,
  checked,
  handleRadioClick,
  onEdit,
  onDeleteSuccess,
}: Props): ReactElement => {
  const [menuAnchorElement, setMenuAnchorElement] = useState<Element | null>(
      null
    ),
    [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false),
    tokenStatus = useTokenStatus(),
    [jobDeletedWithFailure, setJobDeletedWithFailure] =
      useState<boolean>(false);

  const uppercaseFirstLetter = (word: string): string =>
      word.charAt(0).toUpperCase() + word.slice(1),
    uppercaseFirstLetterOfEachWord = (words: string): string =>
      words.toLowerCase().split(" ").map(uppercaseFirstLetter).join(" "),
    formatDate = (date: string): string => moment(date).format("MM.YYYY");

  const openMenu = (event: MouseEvent): void =>
      setMenuAnchorElement(event.currentTarget),
    closeMenu = (): void => setMenuAnchorElement(null),
    startEdit = (): void => {
      closeMenu();
      onEdit(job);
    },
    openDeleteDialog = (): void => {
      closeMenu();
      setDeleteDialogOpened(true);
    },
    closeDeleteDialog = (): void => setDeleteDialogOpened(false),
    deleteJob = async (): Promise<void> => {
      closeDeleteDialog();

      try {
        await jobService.deleteJob(tokenStatus, job.id);

        onDeleteSuccess(job);
      } catch (e: any) {
        setJobDeletedWithFailure(true);
      }
    };

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
            <MenuItem key="edit" onClick={startEdit}>
              Editeaza
            </MenuItem>

            <MenuItem key="delete" onClick={openDeleteDialog}>
              Sterge
            </MenuItem>
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

      <CustomDialog
        title="Sterge functie"
        actionText="sterge"
        icon="delete"
        open={deleteDialogOpened}
        onClose={closeDeleteDialog}
        onAction={deleteJob}
        contentHeight="100px"
      >
        <Typography variant="h6" align="center" color="error">
          Sunteti sigur ca doriti sa stergeti functia "{job.name}"?
        </Typography>
      </CustomDialog>

      <Snackbar
        open={jobDeletedWithFailure}
        autoHideDuration={5000}
        onClose={(): void => setJobDeletedWithFailure(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">
          Functia "{job.name}" nu a putut fi stearsa. Va rugam sa incercati din
          nou.
        </Alert>
      </Snackbar>
    </Box>
  );
};
