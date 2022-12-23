import { styled } from '@mui/material';
import { MarginTopHeader, FlexBoxCenter } from '../../theme/template';

export const NotFoundPageStyled = styled('div')`
  ${MarginTopHeader};
  ${FlexBoxCenter};
  height: calc(100vh - 66px);
`;

export const DescriptionBlock = styled('div')`
  font-family: 'Mulish';
  font-style: normal;

  font-size: 30px;
  line-height: 38px;
  max-width: 450px;
  text-align: center;

  h3 {
    font-weight: 800;
    margin-bottom: 50px;
  }

  h4 {
    margin-bottom: 50px;
    font-size: 24px;
  }

  a {
    padding: 10px 75px;
    border-radius: 5px;
    background: ${props => props.theme.palette.customColor.main};
    font-weight: 800;
    color: #fff;
  }
`;
