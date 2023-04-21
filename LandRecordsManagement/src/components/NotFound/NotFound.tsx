import React from 'react';
import './style.scss';

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message = 'Page Not Found' }) => {
  return (
    <div className="not-found">
      <h1>{message}</h1>
    </div>
  );
};

export default NotFound;
