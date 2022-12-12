import React from 'react';
import { IApiResponseSession } from '../../../../../../../api/apiMethods';
import { StyledSessionChoose } from './Session.styled';

interface SessionChooseProps {
  session: IApiResponseSession;
}

export const SessionChoose: React.FC<SessionChooseProps> = ({ session }) => {
  return <StyledSessionChoose>{session.session_start}</StyledSessionChoose>;
};
