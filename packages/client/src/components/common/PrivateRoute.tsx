import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../../utils/session'

interface PrivateRouteProps {
  component: React.ComponentType
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: RouteComponent }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" />
  }

  return <RouteComponent />
}

export default PrivateRoute