import { styled } from '@mui/material';

export const StyledMovie = styled('div')`
  padding: 50px 0;
`;

export const StyledPosterBlock = styled('div')`
  width: 100%;
  height: 470px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MovieStatsBlock = styled('ul')`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 26px;

  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;

  span {
    font-weight: 700;
  }
`;

export const StyledHeading = styled('h2')`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 45px;
  text-align: center;
  margin-bottom: 35px;
`;

export const MovieAboutBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 0 75px;

  div {
    h3 {
      font-family: 'Mulish';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 25px;
    }

    p {
      font-family: 'Anonymous Pro';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 120%;

      letter-spacing: 0.02em;
    }
  }
`;
