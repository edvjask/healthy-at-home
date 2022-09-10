import React, {createContext, ReactNode, SyntheticEvent, useContext, useState} from "react";


interface ISnackbarContext {
    open: boolean,
    setOpen: (val: boolean) => void;
    openWithMessage: (val: string) => void;
    message: string;
    handleClose: (e?: SyntheticEvent | Event, reason?: string) => void;
}

export const SnackbarContext = createContext<ISnackbarContext | null>(null);

export const useSnackbarContext = () => {
    return useContext(SnackbarContext) as ISnackbarContext;
};

export const SnackbarContextProvider: React.FC<ReactNode> = ({children}) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const openWithMessage = (message: string) => {
        setOpen(true);
        setMessage(message);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackbarContext.Provider
            value={{
                open,
                setOpen,
                openWithMessage,
                message,
                handleClose,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}