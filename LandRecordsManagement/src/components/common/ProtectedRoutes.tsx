import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  isAuthenticated: () => boolean;
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({
  isAuthenticated,
  redirectPath,
  children,
}) => {
  if (isAuthenticated()) {
    return <>{children}</>;
  }
  return <Navigate to={redirectPath} replace />;
 
};

export default ProtectedRoute;
