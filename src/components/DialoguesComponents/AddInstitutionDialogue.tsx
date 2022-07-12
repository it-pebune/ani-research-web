import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { County, Uat } from "../../interfaces/UatInterfaces";
import useTokenStatus from "../../utils/useTokenStatus";
import { uatsServices } from "../../services/uatServices";
import { Institution } from "../../interfaces/IntitutionInterfaces";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { capitalizeFirst } from "../../utils/stringUtils";
import { institutionService } from "../../services/institutionsService";
import { ApiErrors } from "../../enums/ErrorsEnums";

interface Props {
  onClose: any;
  onAction: any;
}

interface IErrors {
  name?: string;
  address?: string;
  type?: string;
  sirutaId?: string;
  cui?: string;
  regCom?: string;
  dateStart?: string;
  dateEnd?: string;
}

const AddInstitutionDialogue: React.FC<Props> = ({ onClose, onAction }) => {
  const noInstitution = {
    name: "",
    type: null,
    sirutaId: null,
    requireDecls: false,
    dateStart: "",
    dateEnd: "",
    address: "",
    cui: "",
    regCom: "",
    aditionalInfo: "",
  };
  const tokenStatus = useTokenStatus();
  const [counties, setCounties] = useState<County[]>([]);
  const [allUats, setAllUats] = useState<Uat[]>([]);
  const [uats, setUats] = useState<Uat[]>([]);
  const [selectedType, setSelectedType] = useState<string | undefined>("");
  const [institutionData, setInstitutionData] =
    useState<Institution>(noInstitution);
  const [errors, setErrors] = useState<IErrors>({});
  const [dateStart, setDateStart] = useState<object | null>();
  const [dateEnd, setDateEnd] = useState<object | null>();
  const institutionTypes = [
    { label: "Institutie Publica", value: 0 },
    { label: "Institutie Privata", value: 1 },
    { label: "ONG", value: 2 },
    { label: "Universitate", value: 3 },
    { label: "Liceu", value: 4 },
    { label: "Senat", value: 254 },
    { label: "Camera Deputatilor", value: 255 },
  ];

  const handleCounty = (evt: any, data: any) => {
    setUats(allUats.filter((uat) => uat.countyId === data.id));
  };

  const handleUat = (evt: any, data: any) => {
    setInstitutionData((prevData: Institution) => ({
      ...prevData,
      sirutaId: data.sirutaId,
    }));
  };

  const handleTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstitutionData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleReqDeclarations = () => {
    setInstitutionData((prevData) => ({
      ...prevData,
      requireDecls: prevData.requireDecls ? !prevData.requireDecls : true,
    }));
  };

  const handleType = (
    target:
      | (EventTarget & HTMLInputElement)
      | (EventTarget & { value: string; name: string })
  ) => {
    setSelectedType(target.value);
    setInstitutionData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleDateStart = (date: object | null) => {
    setDateStart(date);
    setInstitutionData((prevData: Institution) => ({
      ...prevData,
      dateStart: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const handleDateEnd = (date: object | null) => {
    setDateEnd(date);
    setInstitutionData((prevData: Institution) => ({
      ...prevData,
      dateEnd: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const handleAddInstitution = async (): Promise<void> => {
    setErrors({});

    try {
      await institutionService.addInstitution({
        ...tokenStatus,
        ...institutionData,
        requireDecls: institutionData.requireDecls ? 1 : 0,
        regCom:
          institutionData.regCom !== "" ? institutionData.regCom : undefined,
        cui: institutionData.cui !== "" ? institutionData.cui : undefined,
        address:
          institutionData.address !== "" ? institutionData.address : undefined,
        dateStart:
          institutionData.dateStart !== ""
            ? new Date(institutionData.dateStart)
            : undefined,
        dateEnd:
          institutionData.dateEnd !== ""
            ? new Date(institutionData.dateEnd)
            : undefined,
      });

      onAction();
    } catch (e: any) {
      handleAddInstitutionError(e);
    }
  };

  const handleAddInstitutionError = (error: any): void => {
    if (ApiErrors.VALIDATION !== error?.response?.data?.code) {
      return;
    }

    const errors: IErrors = {};

    for (const validationError of error.response.data.details) {
      errors[validationError.context.key as keyof IErrors] =
        validationError.message;
    }

    setErrors(errors);
  };

  useEffect(() => {
    if (tokenStatus.active) {
      const getCountiesResponse = async () => {
        const countiesResponse = await uatsServices.getCounties({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
        });
        setCounties(countiesResponse);
      };

      const getUatsResponse = async () => {
        const uatsResponse = await uatsServices.getUats({
          token: tokenStatus.token as string,
          active: tokenStatus.active,
        });
        setAllUats(uatsResponse);
      };

      getCountiesResponse();
      getUatsResponse();
    }
  }, []);

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "900px",
          maxWidth: "80%",
          height: "800px",
        },
      }}
      onClose={onClose}
      open={true}
    >
      <DialogTitle
        sx={{
          color: "#6B636B",
          fontSize: "17px",
          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <Icon sx={{ fontSize: "16px", marginRight: "16px" }}>add</Icon>
        Adauga institutie
        <IconButton
          sx={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={onClose}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "450px",
          justifyContent: "space-around",
        }}
      >
        <TextField
          label="Denumirea institutiei"
          name="name"
          spellCheck={false}
          onChange={handleTextField}
          error={!!errors.name}
          helperText={errors.name}
          FormHelperTextProps={{
            sx: { marginLeft: "auto" },
          }}
          sx={{ height: "50px" }}
        />

        <TextField
          label="Adresa institutiei"
          name="adress"
          spellCheck={false}
          onChange={handleTextField}
          error={!!errors.address}
          helperText={errors.address}
          FormHelperTextProps={{
            sx: { marginLeft: "auto" },
          }}
          sx={{ height: "50px" }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            height: "50px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              id="type-select-label"
              sx={{ color: errors.type ? "red" : "inherit" }}
            >
              Tipul institutiei
            </InputLabel>

            <Select
              labelId="type-select-label"
              id="demo-simple-select"
              name="type"
              error={!!errors.type}
              value={selectedType}
              label="Tipul institutiei"
              onChange={(e) => handleType(e.target)}
            >
              {institutionTypes.map((type, index) => (
                <MenuItem key={index} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            {errors.type && (
              <FormHelperText sx={{ color: "red", marginLeft: "auto" }}>
                {errors.type}
              </FormHelperText>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox onClick={handleReqDeclarations} />}
            label="Institutia necesita declaratii de avere"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            height: "50px",
          }}
        >
          <Autocomplete
            id="county-select"
            options={counties}
            getOptionLabel={(option) => option && option.name}
            onChange={(e, newValue) => handleCounty(e, newValue)}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {capitalizeFirst(option.name)}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Alege judet"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />

          <Autocomplete
            id="uat-select"
            options={uats}
            getOptionLabel={(option) => option && capitalizeFirst(option.name)}
            onChange={(e, newValue) => handleUat(e, newValue)}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {capitalizeFirst(option.name)}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Alege localitate"
                error={!!errors.sirutaId}
                helperText={errors.sirutaId}
                FormHelperTextProps={{
                  sx: { marginLeft: "auto" },
                }}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            height: "50px",
          }}
        >
          <TextField
            label="Cod unic de inregistrare"
            name="cui"
            onChange={handleTextField}
            error={!!errors.cui}
            helperText={errors.cui}
            FormHelperTextProps={{
              sx: { marginLeft: "auto" },
            }}
          />
          <TextField
            label="Nr inreg registrul Comertului"
            name="regCom"
            onChange={handleTextField}
            error={!!errors.regCom}
            helperText={errors.regCom}
            FormHelperTextProps={{
              sx: { marginLeft: "auto" },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <DesktopDatePicker
            label="Data inceput activitate"
            mask="__ __ ____"
            inputFormat="DD MM YYYY"
            value={dateStart}
            onChange={handleDateStart}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors.dateStart}
                helperText={errors.dateStart}
                FormHelperTextProps={{
                  sx: { marginLeft: "auto" },
                }}
              />
            )}
          />

          <DesktopDatePicker
            label="Data sfarsit activitate"
            mask="__ __ ____"
            inputFormat="DD MM YYYY"
            value={dateEnd}
            onChange={handleDateEnd}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors.dateEnd}
                helperText={errors.dateEnd}
                FormHelperTextProps={{
                  sx: { marginLeft: "auto" },
                }}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "16px", borderTop: "1px solid #bdbdbd" }}>
        <Button onClick={handleAddInstitution}>adauga</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInstitutionDialogue;
