import {Alert, AlertColor, Snackbar, SnackbarOrigin} from "@mui/material";

type SnackProps = {
    open: boolean,
    handleClose: () => void,
    message: string,
    alertType?: AlertColor,
}

export const SnackBar = ({open, handleClose, message, alertType = 'error'}: SnackProps) => {

    const position: SnackbarOrigin = {
        vertical: 'bottom',
        horizontal: 'center',
    }

    return (
        <Snackbar
            anchorOrigin={position}
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
        >
            <Alert onClose={handleClose} severity={alertType} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
}