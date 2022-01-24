import { Avatar, Grid, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { User } from "../../interfaces/UserInterfaces";
import CustomAvatar from "../../shared/CustomAvatar";

interface ModalEditUserFormProps {
    focusedUser: User
}

const ModalEditUserForm = (props: ModalEditUserFormProps) => {

    const [userProperties, setUserProperties] = useState<User>(props.focusedUser);
    
    return (
        <form>
            <Grid container spacing={3}>
                <Grid item container xs={12} justifyContent="center" alignItems="center" >
                    <CustomAvatar alt={userProperties.displayName} src={userProperties.profileImageUrl} />
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                    variant = "outlined"
                    label = "Full name"
                    value={userProperties.displayName}
                    //onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                    variant = "outlined"
                    label = "Full name"
                    value={userProperties.displayName}
                    //onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    variant = "outlined"
                    label = "Email"
                    value={userProperties.email}
                    //onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    variant = "outlined"
                    label = "Email"
                    value={userProperties.email}
                    //onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </form>
    );
}

export default ModalEditUserForm;