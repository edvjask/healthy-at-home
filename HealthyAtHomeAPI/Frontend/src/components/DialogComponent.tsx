import {
    Alert,
    AlertColor,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    SnackbarOrigin,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {ReactNode} from "react";

type DialogComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: ReactNode;
    onButtonClick: (e: React.MouseEvent<HTMLElement>) => void;
    buttonTitle: string;
    buttonDisabled?: boolean;
    isLoading?: boolean;
    alertText?: string;
    alertColor?: AlertColor;
    snackOpen?: boolean;
    snackOnClose?: () => void;
};

export const DialogComponent = ({
                                    isOpen,
                                    onClose,
                                    title,
                                    children,
                                    onButtonClick,
                                    buttonTitle,
                                    buttonDisabled = false,
                                    isLoading,
                                    alertText,
                                    alertColor,
                                    snackOpen,
                                    snackOnClose,
                                }: DialogComponentProps) => {
    const snackPosition: SnackbarOrigin = {
        vertical: "bottom",
        horizontal: "center",
    };

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={isOpen}
                onClose={onClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                <DialogContent style={{width: "100%", color: "white"}}>
                    {children}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="center"
                        onClick={onButtonClick}
                        color="primary"
                        disabled={buttonDisabled}
                    >
                        {buttonTitle}
                    </LoadingButton>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={snackPosition}
                open={snackOpen}
                autoHideDuration={4000}
                onClose={snackOnClose}
            >
                <Alert
                    onClose={snackOnClose}
                    severity={alertColor}
                    sx={{width: "100%"}}
                >
                    {alertText}
                </Alert>
            </Snackbar>
        </>
    );
};
