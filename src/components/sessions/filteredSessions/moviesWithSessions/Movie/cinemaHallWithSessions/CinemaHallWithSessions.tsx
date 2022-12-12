import React from 'react';
import { IApiResponseCinemaHall, IApiResponseSession } from '../../../../../../api/apiMethods';
import { StyledCinemaHallWithSessionsItem, StyledSessions } from './CinemaHallWithSessions.styled';
import { SessionChoose } from './session/SessionChoose';

interface ICinemaHallWithSessionsProps {
  sessions: IApiResponseSession[] | undefined;
  cinemaHall: IApiResponseCinemaHall;
  date: string;
}

const CinemaHallWithSessions: React.FC<ICinemaHallWithSessionsProps> = ({
  sessions,
  cinemaHall,
  date,
}) => {
  return (
    <StyledCinemaHallWithSessionsItem>
      <span>{cinemaHall.name}</span>
      <StyledSessions>
        {sessions
          ?.filter(session => session.cinema_hall_id === cinemaHall.cinemas_hall_id)
          .sort((a, b) => parseInt(a.session_start) - parseInt(b.session_start))
          .map(session => (
            <SessionChoose key={session.session_id} session={session} />
          ))}
      </StyledSessions>
    </StyledCinemaHallWithSessionsItem>
  );
};

export default CinemaHallWithSessions;
