import {useNotificationStore} from '@/stores/notifications';
import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";


export const Notifications = () => {
    const {notifications, dismissNotification} = useNotificationStore();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, [notifications]);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div
            aria-live="assertive"
            className="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
            {notifications.map((notification) => (
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert severity={notification.type}>
                        <AlertTitle>{notification.title}</AlertTitle>
                        {notification.message}
                    </Alert>
                </Snackbar>

            ))}
        </div>
    );
};