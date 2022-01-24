import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { User } from '../../interfaces/UserInterfaces';
import CustomButton from '../../shared/CustomButton';
import CustomTypography from '../../shared/CustomTypography';
import ModalEditUserForm from './ModalEditUserForm';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ModalEditUserProps {
    focusedUser: User,
    modalIsOpen: boolean,
    //TODO
    handleCloseModal: any
}

const ModalEditUser = (props: ModalEditUserProps) => {
    return (
        <Dialog
            open={props.modalIsOpen}
            onClose={props.handleCloseModal}
        >
            <DialogTitle sx={{flexDirection: 'row'}}>
                <CustomTypography transKey='components.modal-edit-user.header.title' sx={{ alignSelf: 'flex-start', fontSize: 30, fontWeight: 500 }} />
                <IconButton
                    onClick={props.handleCloseModal} sx={{ position: 'absolute', right: 14, top: 14 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ModalEditUserForm focusedUser={props.focusedUser} />
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                <CustomButton >
                    <CustomTypography withBg transKey='components.modal-edit-user.actions.update-user' />
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
}

export default ModalEditUser;