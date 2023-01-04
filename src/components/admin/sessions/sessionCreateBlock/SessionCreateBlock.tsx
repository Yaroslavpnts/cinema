import React from 'react';
import { IApiResponseCinema } from '../../../../api/apiMethods';
import { AccordionCreteSessions } from './accordionCreateSessions/AccordionCreteSessions';
import { HeadingStyled, SessionCreateBlockStyled } from './SessionCreateBlock.styled';

interface SessionCreateProps {
  cityName: string;
}

const SessionCreateBlock: React.FC<SessionCreateProps> = ({ cityName }) => {
  return (
    <SessionCreateBlockStyled>
      <HeadingStyled>Створення сеансів</HeadingStyled>
      <AccordionCreteSessions cityName={cityName} />
    </SessionCreateBlockStyled>
  );
};

export default SessionCreateBlock;
