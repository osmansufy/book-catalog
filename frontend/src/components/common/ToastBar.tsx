import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

const ToastBar = ({
    message,
    isOpen,
    status = "success"
}: {
    message: string,
    isOpen: boolean,
    status: "success" | "error" | "info" | "warning" | undefined

}) => {
    const [open, setOpen] = React.useState(isOpen);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        console.log(event)
        setOpen(false);
    };


    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message || ""}
                anchorOrigin={{
                    vertical: "top"
                    , horizontal: "right"
                }}
            >
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    {
                        message
                    }
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ToastBar;