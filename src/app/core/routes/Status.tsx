import React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface IProps {
  code: number;
}

export const Status = ({ code, children }: React.PropsWithChildren<IProps>) => {
  return (
    <Route
      render={({ staticContext }: RouteComponentProps) => {
        if (staticContext) staticContext.statusCode = code;
        return children;
      }}
    />
  );
};
