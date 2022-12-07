import { Container } from '@mui/material';
import React from 'react';
import Session from '../../components/sessions/Sessions';
import { StyledSessionPage } from './SessionsPage.style';

const SessionPage: React.FC = () => {
  return (
    <StyledSessionPage>
      <Container>
        <Session />
      </Container>
    </StyledSessionPage>
  );
};

export default SessionPage;
