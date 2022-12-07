import { styled } from '@mui/material';
import { FlexBoxCenter } from '../../../../../theme/template';

export const CreateBlockStyled = styled('div')`
  ${FlexBoxCenter}
  flex-direction: column;
  padding: 31px 93px 61px;
  width: 550px;
`;

export const FormStyled = styled('form')`
  width: 100%;
  text-align: center;
`;

export const InputBlock = styled('div')`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    background: #fbfeff;
    border: 1px solid #59c1ed;
    border-radius: 5px;
    box-sizing: border-box;

    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.03em;

    &:focus {
      border: 2px solid #59c1ed;
      outline: none;
    }

    &::placeholder {
      color: #969696;
    }
  }

  .MuiFormControl-root {
    width: 100%;
    input {
      background: none;
      border: none;
    }
  }

  label {
    display: block;
  }
`;

export const ButtonStyled = styled('button')`
  padding: 10px;
  background: #3cb4e7;
  border: 1px solid #59c1ed;
  box-shadow: 5px 7px 9px rgba(97, 187, 225, 0.36);
  border-radius: 10px;
  width: 100%;

  font-family: 'Anonymous Pro';
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.03em;
  color: #ffffff;
`;

export const Error = styled('div')`
  color: red;
  font-size: 12px;
`;
