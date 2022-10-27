import { styled } from '@mui/material';
import { Form } from 'formik';

export const FormStyled = styled(Form)`
  width: 350px;
  text-align: center;
`;

export const InputBlock = styled('div')`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  input {
    width: 100%;
    padding: 3px 7px;
  }

  textarea[name='description'] {
    width: 100%;
    /* height: auto; */
    min-height: 26px;
    resize: none;
    padding: 3px 7px;
    vertical-align: middle;
    font-size: 14px;
    line-height: 14px;
    transition: all 0.3s;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  label {
    display: block;
    width: 100%;
    text-align: start;
  }

  > div {
    width: 85%;
  }

  > svg {
    font-size: 40px;
    cursor: pointer;
  }
`;

export const ButtonStyled = styled('button')`
  padding: 3px 7px;
`;

export const Error = styled('div')`
  color: red;
  font-size: 12px;
`;
