import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { SocialInfo } from "../../interfaces/UserInterfaces";
import { userRoleConvertor } from "../../utils/userRoles";
import { MouseEventHandler, ReactNode } from "react";

const CustomTypographyPrimary = styled(Typography)({
    fontSize: "25px",
    fontWeight: "500",
  }),
  CustomTypographySecondary = styled(Typography)({
    color: "#818386",
    fontSize: "25px",
    fontWeight: "500",
  }),
  useStyles = makeStyles(() => ({
    socialMediaIcon: {
      "&:hover": {
        color: "blue",
      },
    },
  }));

interface UserProfileDisplayProps {
  email: string;
  displayName: string;
  profileImageUrl: string;
  socialInfo: SocialInfo | string;
  phone: string;
  roles: number[];
  switchToEditModeHandler?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

const UserProfileHeaderContent = (props: UserProfileDisplayProps) => {
  const parsedSocialInfo: SocialInfo =
      typeof props.socialInfo === "string"
        ? JSON.parse(props.socialInfo)
        : props.socialInfo,
    socialInfo: SocialInfo = parsedSocialInfo ?? { facebook: "", linkedIn: "" },
    classes = useStyles();

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
        <CustomTypographyPrimary sx={{ fontSize: "40px !important" }}>
          {props.displayName}
        </CustomTypographyPrimary>

        <Stack>
          {props.roles &&
            props.roles.map((roleId) => (
              <ListItem key={roleId}>
                <CustomTypographySecondary sx={{ fontSize: "30px !important" }}>
                  {userRoleConvertor(roleId)}
                </CustomTypographySecondary>
              </ListItem>
            ))}
        </Stack>

        <Grid item container direction={"row"} sx={{ marginTop: "10px" }}>
          {socialInfo?.facebook && (
            <Link href={socialInfo.facebook} target="_blank">
              <FacebookIcon
                fontSize="large"
                className={classes.socialMediaIcon}
              />
            </Link>
          )}

          {socialInfo?.linkedIn && (
            <Link href={socialInfo.linkedIn} target="_blank">
              <LinkedInIcon
                fontSize="large"
                className={classes.socialMediaIcon}
              />
            </Link>
          )}
        </Grid>
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
        <CustomTypographySecondary>Email</CustomTypographySecondary>
        <CustomTypographyPrimary>
          {props.email || "Not found"}
        </CustomTypographyPrimary>

        <CustomTypographySecondary>Phone</CustomTypographySecondary>
        <CustomTypographyPrimary>
          {props.phone || "Not found"}
        </CustomTypographyPrimary>
      </Grid>

      {/* edit button area */}
      {props.switchToEditModeHandler && (
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          container
          direction={"column"}
          justifyContent={"center"}
          sx={{ paddingLeft: "150px", paddingRight: "60px" }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={props.switchToEditModeHandler}
          >
            <Typography>Edit profile</Typography>
          </Button>
        </Grid>
      )}

      {props.children}
    </Grid>
  );
};

export default UserProfileHeaderContent;
