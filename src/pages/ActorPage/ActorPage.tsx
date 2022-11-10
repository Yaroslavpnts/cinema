import { Container } from '@mui/material';
import React from 'react';
import Actor from '../../components/actors/actor/Actor';
import { StyledActorPage } from './ActorPage.style';

const ActorPage = () => {
  return (
    <StyledActorPage>
      <Container>
        <Actor />
      </Container>
    </StyledActorPage>
  );
};

export default ActorPage;
