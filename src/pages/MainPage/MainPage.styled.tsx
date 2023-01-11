import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

export const MainPageWrapper = styled('main')`
  padding: 0 0px 30px;
`;

export const StyledHeading = styled(Typography)`
  font-size: 40px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;
