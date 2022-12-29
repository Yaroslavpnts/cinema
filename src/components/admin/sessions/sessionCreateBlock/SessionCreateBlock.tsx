import React from 'react';
import { AccordionCreteSessions } from './accordionCreateSessions/AccordionCreteSessions';
import {
  HeadingStyled,
  SessionCreateBlockStyled,
  SessionParametersListStyled,
} from './SessionCreateBlock.styled';

interface SessionCreateProps {
  cityName: string;
}

const SessionCreateBlock: React.FC<SessionCreateProps> = ({ cityName }) => {
  return (
    <SessionCreateBlockStyled>
      <HeadingStyled>Створення сеансів</HeadingStyled>
      <AccordionCreteSessions />
    </SessionCreateBlockStyled>
  );
};

export default SessionCreateBlock;
