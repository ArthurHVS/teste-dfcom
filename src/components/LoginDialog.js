import React from 'react';
import Login from './Login.js';
import { Dialog } from '@material-ui/core';

const LoginDialog = (isLogged) => {
    return (
        <Dialog open={isLogged}>
            <Login />
        </Dialog>
    )
}

export default LoginDialog
