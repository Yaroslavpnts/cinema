import { styled } from '@mui/material';

export const StyledMovieWithSessionsItem = styled('div')`
  display: flex;
  padding: 10px 20px;
  background: #f1f1f1;
  h2 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 28px;
  }
  h3 {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
  }
`;

export const StyledMovieImageBlock = styled('div')`
  width: 155px;
  height: 200px;
  object-fit: cover;
  margin-right: 65px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  > div {
    position: absolute;
    right: 0;
    bottom: 0;
    background: linear-gradient(143.33deg, #ffffff -8.1%, #b8e2f4 124.58%);
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledCinemaHallsWithSessionsBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    margin-bottom: 10px;
  }
`;

export const StyledSessionsByDate = styled('div')``;
