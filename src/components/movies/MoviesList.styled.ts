import { styled, Typography } from '@mui/material';

export const MoviesContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-template-rows: auto;
  gap: 30px;
`;

// export const StyledHeading = styled(Typography)`
//   font-size: 40px;
//   text-align: center;

//   @media (max-width: 500px) {
//     font-size: 24px;
//   }
// `;
