import { styled } from '@mui/material';

export const MoviesContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-template-rows: auto;
  gap: 30px;
`;
