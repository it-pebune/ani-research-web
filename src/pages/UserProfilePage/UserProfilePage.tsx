import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Note, SpecifiedUser } from "../../interfaces/UserInterfaces";
import useTokenStatus from "../../utils/useTokenStatus";
import userService from "../../services/userService";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
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
    [notes, setNotes] = useState<Note[]>([]),
    navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      setUser(await userService.getSpecifiedUser(tokenStatus, id));
    };

    loadUser();
  }, [id]);

  useEffect(() => {
    if (!user) {
      return;
    } else if (!user.notes || 0 === user.notes.length) {
      setNotes([]);

      return;
    }

    const sortedNotes = user.notes.slice();

    sortedNotes.sort((note1: Note, note2: Note): number => {
      if (note1.createdAt === note2.createdAt) {
        return 0;
      }

      return note1.createdAt < note2.createdAt ? 1 : -1;
    });

    setNotes(sortedNotes);
  }, [user]);

  const formatDate = (date: string) => new Date(date).toLocaleString(),
    { control, handleSubmit, setError } = useForm<IFormInput>({
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
              justifyContent="space-between"
              sx={{ marginTop: 12 }}
            >
              <Grid
                item
                container
                md={6}
                sx={{ paddingLeft: 12, paddingRight: 12 }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    height: "fit-content",
                    maxHeight: 200,
                    padding: 2,
                    overflow: "auto",
                    backgroundColor: "#F6F6F6",
                    borderRadius: 1,
                  }}
                >
                  {notes.length > 0 ? (
                    notes.map((note: Note, index: number) => (
                      <Paper key={index} sx={{ margin: 1, padding: 1 }}>
                        <Typography color="#000000">
                          <Typography component="span" fontWeight="bold">
                            {`${note.author} [${formatDate(note.createdAt)}]: `}
                          </Typography>
                          {note.content}
                        </Typography>
                      </Paper>
                    ))
                  ) : (
                    <Typography variant="h5" textAlign={"center"}>
                      No notes were added for this user.
                    </Typography>
                  )}
                </Stack>
              </Grid>

              <Grid
                item
                container
                direction="column"
                justifyContent="space-between"
                md={6}
                sx={{ paddingLeft: 12, paddingRight: 12 }}
              >
                <Grid item sx={{ marginBottom: 12 }}>
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
