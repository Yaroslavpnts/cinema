import { Container, styled } from '@mui/material';
import { FlexBoxCenter } from '../../../theme/template';

export const MoviesBlockStyled = styled('div')`
  /* ${FlexBoxCenter}
  
  padding: 30px 0; */
`;

export const StyledContainer = styled(Container)`
  ${FlexBoxCenter}
  padding: 30px 0;
  flex-direction: column;
`;

export const CreateMovieBlock = styled('div')`
  margin-bottom: 50px;
`;

export const MovieDataBlock = styled('div')`
  margin-bottom: 50px;
  width: 85%;
`;
