import { styled } from '@mui/material';
import { Form } from 'formik';
import { FlexBoxCenter } from '../../../../../theme/template';

export const GenreBlockStyled = styled('div')`
  ${FlexBoxCenter}
  padding: 30px 0;
`;

export const FormStyled = styled('form')`
  width: 250px;
  text-align: center;
`;

export const InputBlock = styled('div')`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 3px 7px;
  }

  label {
    display: block;
  }
`;

export const ButtonStyled = styled('button')`
  padding: 3px 7px;
`;

export const Error = styled('div')`
  color: red;
  font-size: 12px;
`;
