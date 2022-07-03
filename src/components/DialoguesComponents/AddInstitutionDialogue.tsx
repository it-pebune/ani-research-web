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

interface Props {
  open: boolean;
  onClose: any;
  onAction: any;
}

const AddInstitutionDialogue: React.FC<Props> = ({
  open,
  onClose,
  onAction,
}) => {
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

  const [formErrors, setFormErrors] = useState({
    name: false,
    type: false,
    sirutaId: false,
  });

  const [dateStart, setDateStart] = useState<object | null>();
  const [dateEnd, setDateEnd] = useState<object | null>();

  const institutionTypes = [
    { label: "institutie publica", value: 0 },
    { label: "institutie privata", value: 1 },
    { label: "ONG", value: 2 },
    { label: " universitate", value: 3 },
    { label: "liceu", value: 4 },
    { label: "senat", value: 254 },
    { label: "camera depututilor", value: 255 },
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

  const handleAddInstitution = async () => {
    console.log(institutionData.type);
    if (
      institutionData.sirutaId ||
      institutionData.name === "" ||
      institutionData.type ||
      institutionData.type === 0
    ) {
      if (tokenStatus.active) {
        const addInstitutionResponse = await institutionService.addInstitution({
          ...tokenStatus,
          ...institutionData,
          requireDecls: institutionData.requireDecls ? 1 : 0,
          regCom:
            institutionData.regCom !== "" ? institutionData.regCom : undefined,
          cui: institutionData.cui !== "" ? institutionData.cui : undefined,
          address:
            institutionData.address !== ""
              ? institutionData.address
              : undefined,
          dateStart:
            institutionData.dateStart !== ""
              ? new Date(institutionData.dateStart)
              : undefined,
          dateEnd:
            institutionData.dateEnd !== ""
              ? new Date(institutionData.dateEnd)
              : undefined,
        });

        console.log(addInstitutionResponse);
      }
    } else {
      setFormErrors((prevData) => ({
        ...prevData,
        sirutaId: !institutionData.sirutaId ? true : false,
        name: institutionData.name === "" ? true : false,
        type: !institutionData.type ? true : false,
      }));
    }
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
      open={open}
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
          error={formErrors.name}
          helperText={formErrors.name && "Acest camp este obligatoriu"}
          FormHelperTextProps={{
            sx: { marginLeft: "auto" },
          }}
          sx={{ height: "50px" }}
        ></TextField>

        <TextField
          label="Adresa institutiei"
          name="adress"
          spellCheck={false}
          onChange={handleTextField}
          sx={{ height: "50px" }}
        ></TextField>

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
              sx={{ color: formErrors.type ? "red" : "inherit" }}
            >
              Tipul institutiei
            </InputLabel>

            <Select
              labelId="type-select-label"
              id="demo-simple-select"
              name="type"
              error={formErrors.type}
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
            {formErrors.type && (
              <FormHelperText sx={{ color: "red", marginLeft: "auto" }}>
                Acest camp este obligatoriu
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
          ></Autocomplete>

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
                error={formErrors.sirutaId}
                helperText={formErrors.name && "Acest camp este obligatoriu"}
                FormHelperTextProps={{
                  sx: { marginLeft: "auto" },
                }}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          ></Autocomplete>
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
          ></TextField>
          <TextField
            label="Nr inreg registrul Comertului"
            name="regCom"
            onChange={handleTextField}
          ></TextField>
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
            renderInput={(params) => <TextField {...params} />}
          />

          <DesktopDatePicker
            label="Data sfarsit activitate"
            mask="__ __ ____"
            inputFormat="DD MM YYYY"
            value={dateEnd}
            onChange={handleDateEnd}
            renderInput={(params) => <TextField {...params} />}
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
