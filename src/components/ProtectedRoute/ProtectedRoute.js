import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {

    return (
        localStorage.getItem('loggedIn') === "true" ? <>{element}</> : <Navigate to="/" replace />
    )
}

export default ProtectedRouteElement;