import React from 'react';
import { IApiResponseCinemaHall, IApiResponseSession } from '../../../../../../api/apiMethods';

interface ICinemaHallWithSessionsProps {
  sessions: IApiResponseSession[] | undefined;
  cinemaHall: IApiResponseCinemaHall;
}

const CinemaHallWithSessions: React.FC<ICinemaHallWithSessionsProps> = ({
  sessions,
  cinemaHall,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>{cinemaHall.name}</div>
      <div style={{ display: 'flex', gap: '15px' }}>
        {sessions
          ?.filter(session => session.cinema_hall_id === cinemaHall.cinemas_hall_id)
          .map(session => (
            <div>{session.session_start}</div>
          ))}
      </div>
    </div>
  );
};

export default CinemaHallWithSessions;
