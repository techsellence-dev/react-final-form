import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Protected2'

export const RequireAuth = ({ children }) => {
    const auth = useAuth()

    if (!auth.user) {
        return <Navigate to='/' />
    }

    return children

}
