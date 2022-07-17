import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from './Protected2'

const RequireAuth2 = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.roles?.find(role => allowedRoles?.include(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized"
                    state={{ from: location }}
                    replace />
                : <Navigate to='/home'
                    state={{ from: location }} 
                    replace />
    );
}

export default RequireAuth2
