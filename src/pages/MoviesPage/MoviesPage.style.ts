import { styled, Typography } from '@mui/material';
import { MarginTopHeader } from '../../theme/template';
import Pagination from '@mui/material/Pagination';

export const StyledMoviePage = styled('main')`
  ${MarginTopHeader};
  padding: 20px 0;
`;

export const StyledHeading = styled(Typography)`
  font-size: 40px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;
