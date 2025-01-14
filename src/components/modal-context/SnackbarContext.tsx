import React from 'react';

export type SnackbarContextType = {
    openSnackbar?: (message: any, timeLimit?: number) => void,
    handleSnackbarClose?: (event: React.SyntheticEvent | Event, reason?: string) => void
};

const SnackbarContext = React.createContext<SnackbarContextType>({});

export default SnackbarContext;
