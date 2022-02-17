import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Theme } from "@mui/system";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { SocialInfo } from "../../interfaces/UserInterfaces";
import { userRoleConvertor } from "../../utils/userRoles";

const CustomTypographyPrimary = styled(Typography)({
  fontSize: "25px",
  fontWeight: "500",
});

const CustomTypographySecondary = styled(Typography)({
  color: "#818386",
  fontSize: "25px",
  fontWeight: "500",
});

const useStyles = makeStyles((theme: Theme) => ({
  socialMediaIcon: {
    "&:hover": {
      color: "blue",
    },
  },
}));

interface UserProfileHeaderProps {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  profileImageUrl: string | undefined;
  socialInfo: SocialInfo | undefined;
  phone: string | undefined;
  roles: number[] | undefined;
}

const UserProfileHeader = (props: UserProfileHeaderProps) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        boxShadow: "-4px 10px 40px rgba(44, 63, 88, 0.05)",
      }}
    >
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
            {props.firstName + " " + props.lastName}
          </CustomTypographyPrimary>
          <CustomTypographySecondary sx={{ fontSize: "30px !important" }}>
            {props.roles &&
              props.roles.map((roleId) => userRoleConvertor(roleId))}
          </CustomTypographySecondary>
          <Grid item container direction={"row"} sx={{ marginTop: "10px" }}>
            {props.socialInfo && (
              <FacebookIcon
                fontSize="large"
                className={classes.socialMediaIcon}
                href={props.socialInfo.facebook}
              />
            )}
            {props.socialInfo && (
              <LinkedInIcon
                fontSize="large"
                className={classes.socialMediaIcon}
              />
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
      </Grid>
    </Paper>
  );
};

export default UserProfileHeader;
