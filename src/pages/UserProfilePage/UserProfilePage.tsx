import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SpecifiedUser } from "../../interfaces/UserInterfaces";
import useTokenStatus from "../../utils/useTokenStatus";
import userService from "../../services/userService";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import UserProfileHeader from "../../components/UserProfile/UserProfileHeader";
import Loader from "../../components/Shared/Loader";
import UserProfileHeaderContent from "../../components/UserProfile/UserProfileHeaderContent";
import FormInputText from "../../components/Shared/FormComponents/FormInputText";
import { useForm } from "react-hook-form";
import { ApiErrors } from "../../enums/ErrorsEnums";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  note: string;
}

const UserProfilePage: React.FC = () => {
  const tokenStatus = useTokenStatus(),
    id: number = useParams().id as unknown as number,
    [user, setUser] = useState<SpecifiedUser>(),
    navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      setUser(await userService.getSpecifiedUser(tokenStatus, id));
    };

    loadUser();
  }, [id]);

  const { control, handleSubmit, setError } = useForm<IFormInput>({
      defaultValues: { note: "" },
    }),
    onSubmit = async (formInput: IFormInput) => {
      try {
        setUser(await userService.addUserNote(tokenStatus, id, formInput.note));

        navigate("/users");
      } catch (error: any) {
        if (ApiErrors.VALIDATION !== error?.response?.data?.code) {
          return;
        }

        for (const validationError of error.response.data.details) {
          setError(validationError.context.key, validationError);
        }
      }
    };

  return (
    <Box sx={{ padding: "100px 90px" }}>
      <UserProfileHeader elevation={0}>
        {!user && <Loader />}

        {user && (
          <UserProfileHeaderContent
            email={user.email}
            displayName={user.displayName}
            profileImageUrl={user.profileImageUrl}
            socialInfo={user.socialInfo}
            phone={user.phone}
            roles={user.roles}
          >
            <Grid
              container
              justifyContent="center"
              sx={{ marginTop: "48px", padding: "24px" }}
            >
              <Grid item md={6}>
                {user.notes?.length > 0 ? (
                  <List>
                    {user.notes.map((note: string) => (
                      <ListItem>
                        <Typography
                          variant="h5"
                          sx={{ color: "#818386", fontStyle: "italic" }}
                        >
                          {note}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="h5">
                    No notes were added for this user.
                  </Typography>
                )}
              </Grid>

              <Grid
                container
                direction="column"
                justifyContent="space-between"
                spacing={16}
                md={6}
              >
                <Grid item>
                  <FormInputText
                    name="note"
                    control={control}
                    label="Note"
                    multiline
                    required
                    rows={4}
                    sx={{ width: "100%" }}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Typography>Add note</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </UserProfileHeaderContent>
        )}
      </UserProfileHeader>
    </Box>
  );
};

export default UserProfilePage;
