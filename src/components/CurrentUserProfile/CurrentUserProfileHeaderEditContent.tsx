import { Avatar, Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  SocialInfo,
  SpecifiedUserToUpdate,
} from "../../interfaces/UserInterfaces";
import userService from "../../services/userService";
import useTokenStatus from "../../utils/useTokenStatus";
import FormInputText from "../Shared/FormComponents/FormInputText";

interface IFormInput {
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string;
  facebook: string;
  linkedIn: string;
}

interface UserProfileEditFormProps {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  profileImageUrl: string;
  socialInfo: string;
  phone: string;
  roles: number[];
  switchToEditModeHandler: any;
}

const CurrentUserProfileHeaderEditContent = (
  props: UserProfileEditFormProps
) => {
  const socialInfo = JSON.parse(props.socialInfo);

  const methods = useForm<IFormInput>({
    defaultValues: {
      firstName: props.firstName,
      lastName: props.lastName,
      displayName: props.displayName,
      phone: props.phone,
      facebook: socialInfo && socialInfo.facebook ? socialInfo.facebook : "",
      linkedIn: socialInfo && socialInfo.linkedIn ? socialInfo.linkedIn : "",
    },
  });

  const { handleSubmit, control } = methods;

  const tokenStatus = useTokenStatus();

  const onSubmit = (userData: IFormInput) => {
    if (tokenStatus.active) {
      const usersResponse = async () => {
        const socialInfoToUpdate: SocialInfo = {
          facebook: userData.facebook ?? null,
          linkedIn: userData.linkedIn ?? null,
        };
        const usedDataToSend: SpecifiedUserToUpdate = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          displayName: userData.displayName,
          phone: userData.phone,
          socialInfo: JSON.stringify(socialInfoToUpdate),
          roles: props.roles,
        };
        const response = await userService.updateSpecifiedUserData(
          { ...tokenStatus },
          props.id,
          usedDataToSend
        );
      };
      usersResponse();
    }
    props.switchToEditModeHandler();
  };

  return (
    <Grid container spacing={2} direction={"row"} sx={{ padding: "30px 0px" }}>
      {/* avatar item-container */}
      <Grid item xs={12} lg={3} container justifyContent={"center"}>
        <Box sx={{ display: "absolute", maxHeight: "150px" }}>
          <Avatar
            variant="rounded"
            sx={{
              display: "relative",
              bottom: "60px",

              height: "200px",
              width: "200px",

              border: "7px white solid",
              borderRadius: "50px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
            src={props.profileImageUrl}
          />
        </Box>
      </Grid>
      {/* firstName, lastName and displayName item-container */}
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        container
        spacing={1}
        direction={"column"}
        justifyContent={"center"}
      >
        <Grid item>
          <FormInputText
            name="firstName"
            control={control}
            label="First Name"
          />
        </Grid>
        <Grid item>
          <FormInputText name="lastName" control={control} label="Last Name" />
        </Grid>
        <Grid item>
          <FormInputText
            name="displayName"
            control={control}
            label="Display Name"
          />
        </Grid>
      </Grid>
      {/* phone and socialInfo item-container */}
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        container
        spacing={1}
        direction={"column"}
        justifyContent={"center"}
        sx={{ borderLeft: "2px #818386 ridge", paddingLeft: "60px" }}
      >
        <Grid item>
          <FormInputText name="phone" control={control} label="Phone" />
        </Grid>
        <Grid item>
          <FormInputText
            name="facebook"
            control={control}
            label="Facebook URL"
          />
        </Grid>
        <Grid item>
          <FormInputText
            name="linkedIn"
            control={control}
            label="LinkedIn URL"
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        lg={1}
        container
        spacing={2}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"baseline"}
      >
        <Grid item>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={props.switchToEditModeHandler}>
            Discard
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CurrentUserProfileHeaderEditContent;
