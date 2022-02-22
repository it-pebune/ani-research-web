import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SocialInfo } from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";
import FormInputText from "../Shared/FormComponents/FormInputText";

interface IFormInput {
  displayNameEntered: string;
  phoneEntered: string;
  facebookUrlEntered: string;
  linkedinUrlEntered: string;
}

const defaultValues = {
  displayNameEntered: "",
  phoneEntered: "",
  facebookUrlEntered: "",
  linkedinUrlEntered: "",
};

interface UserProfileEditFormProps {
  displayName: string;
  profileImageUrl: string;
  socialInfo: SocialInfo;
  phone: string;
  switchToEditModeHandler: any;
}

const UserProfileEditForm = (props: UserProfileEditFormProps) => {
  const methods = useForm<IFormInput>({
    defaultValues: {
      displayNameEntered: props.displayName,
      phoneEntered: props.phone,
      facebookUrlEntered: (props.socialInfo && props.socialInfo.facebook) ?? "",
      linkedinUrlEntered: (props.socialInfo && props.socialInfo.linkedIn) ?? "",
    },
  });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const { id } = useContext(UserContext);
  const tokenStatus = useTokenStatus();
  const onSubmit = (userData: IFormInput) => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        const response = await userService.updateSpecifiedUser(
          { ...tokenStatus },
          userData
        );
      };
      usersResponse();
    }
    props.switchToEditModeHandler();
  };

  return (
    <Grid container direction={"row"} sx={{ padding: "30px 0px" }}>
      {/* avatar area */}
      <Grid item xs={12} md={6} lg={2} container justifyContent={"center"}>
        <Box sx={{ display: "absolute", maxHeight: "150px" }}>
          <Avatar
            variant="rounded"
            sx={{
              border: "7px white solid",
              borderRadius: "50px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
              height: "200px",
              width: "200px",

              display: "relative",
              bottom: "60px",
            }}
            src={props.profileImageUrl}
          />
        </Box>
      </Grid>
      {/* name & social media area */}
      <Grid item xs={12} md={6} lg={4} container direction={"column"}>
        <FormInputText
          name="displayNameEntered"
          control={control}
          label="Display Name"
        />
        <FormInputText name="phoneEntered" control={control} label="Phone" />
      </Grid>
      {/* email & phone area */}
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        container
        direction={"column"}
        sx={{ borderLeft: "2px #818386 ridge", paddingLeft: "60px" }}
      >
        <FormInputText
          name="facebookUrlEntered"
          control={control}
          label="Facebook URL"
        />
        <FormInputText
          name="linkedinUrlEntered"
          control={control}
          label="LinkedIn URL"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        container
        direction={"column"}
        sx={{ paddingLeft: "200px", paddingRight: "60px" }}
      >
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
        <Button variant="contained" onClick={props.switchToEditModeHandler}>
          Discard
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserProfileEditForm;
