import { styled, TextField, css } from '@mui/material';
import { Form } from 'formik';
import AddBoxIcon from '@mui/icons-material/AddBox';

const PlaceholderStyle = css`
  color: #969696;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  font-family: 'Anonymous Pro';
`;

const InputStyle = css`
  width: 100%;
  padding: 9px 15px;
  border: 1px solid #59c1ed;
  border-radius: 5px;
  font-size: 18px;
  line-height: 18px;
  font-family: 'Anonymous Pro';
`;

const NumberFields = css`
  padding: 16.5px 14px;
  background-color: #fff;
  font-family: 'Anonymous Pro';
  font-size: 18px;
  line-height: 18px;
`;

export const FormStyled = styled(Form)`
  padding: 32px 92px;
  text-align: center;
  background-color: #c5e9f8;
  border: 1px solid #59c1ed;
  border-radius: 10px;
`;

export const InputBlock = styled('div')`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: initial;
  width: 390px;

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #59c1ed;
    border-radius: 5px;
  }

  > div {
    > input {
      ${InputStyle}

      &::placeholder {
        ${PlaceholderStyle}
      }
    }
  }

  textarea[name='description'] {
    ${InputStyle}
    resize: none;

    &::placeholder {
      ${PlaceholderStyle}
    }

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  > div {
    width: 100%;
    position: relative;
  }

  > svg {
    font-size: 40px;
    cursor: pointer;
  }
`;

export const AddBoxIconStyled = styled(AddBoxIcon)`
  position: absolute;
  right: -42px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  cursor: pointer;
  fill: ${props => props.theme.palette.customColor.main};
`;

export const RatingBlock = styled('div')`
  display: flex;
  justify-content: space-between;
  text-align: start;

  > div {
    width: 45%;

    div {
      width: 100%;
    }

    input.MuiOutlinedInput-input {
      &::placeholder {
        ${PlaceholderStyle}
        opacity: 1;
      }
    }
  }
`;

export const RatingField = styled(TextField)`
  input {
    ${NumberFields}
  }
`;

export const YearField = styled(TextField)`
  width: 100%;

  input {
    ${NumberFields}
    &::placeholder {
      ${PlaceholderStyle}
      opacity: 1;
    }
  }
`;

export const ButtonStyled = styled('button')`
  width: 100%;
  background-color: ${props => props.theme.palette.customColor.main};
  border: 1px solid #59c1ed;
  box-shadow: 5px 7px 9px rgba(97, 187, 225, 0.36);
  border-radius: 10px;
  font-size: 18px;
  line-height: 22px;
  height: 40px;
  color: #f8f5f5;
  font-weight: bold;
`;

export const Error = styled('div')`
  color: red;
  font-size: 12px;
`;
