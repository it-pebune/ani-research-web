import { Button, Typography } from "@mui/material";
import { SocialInfo } from "../../interfaces/UserInterfaces";

interface UserProfileEditFormProps {
  displayName: string;
  profileImageUrl: string;
  socialInfo: SocialInfo;
  phone: string;
  switchToEditModeHandler: any;
}

const UserProfileEditForm = (props: UserProfileEditFormProps) => {
  return <Button onClick={props.switchToEditModeHandler}>Edit Form</Button>;
};

export default UserProfileEditForm;
