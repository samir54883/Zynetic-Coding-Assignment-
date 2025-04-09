import React from 'react';
import styled from 'styled-components';

const ErrorBox = styled.div`
  color: red;
  text-align: center;
  margin: 5rem;
`;

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <ErrorBox>{message}</ErrorBox>;
};

export default ErrorMessage;
