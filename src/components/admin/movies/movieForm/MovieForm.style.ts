import { styled, TextField, css, Typography } from '@mui/material';
import { Form } from 'formik';
import AddBoxIcon from '@mui/icons-material/AddBox';

const PlaceholderStyle = css`
  color: #969696;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  font-family: 'Anonymous Pro';
`;

const InputStyle = css`
  width: 100%;
  padding: 5px 15px;
  border: 1px solid #59c1ed;
  border-radius: 5px;
  font-size: 16px;
  line-height: 16px;
  font-family: 'Anonymous Pro';
`;

const NumberFields = css`
  padding: 5px 15px;
  background-color: #fff;
  font-family: 'Anonymous Pro';
  font-size: 16px;
  line-height: 16px;
`;

export const StyledTypography = styled(Typography)`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 20px;
`;

export const FormStyled = styled(Form)`
  padding: 20px 92px;
  text-align: center;
  background-color: #c5e9f8;
  border: 1px solid #59c1ed;
  border-radius: 10px;
`;

export const InputBlock = styled('div')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: initial;
  width: 562px;
  &:not(:last-child) {
    margin-bottom: 13px;
  }

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

export const MultipleBlock = styled('div')`
  display: flex;
  justify-content: space-between;
  text-align: start;

  > div {
    width: 30%;

    div {
      width: 100%;
    }

    .MuiOutlinedInput-input {
      min-height: unset;
      height: unset;
      &::placeholder {
        ${PlaceholderStyle}
        opacity: 1;
      }
    }
  }
  .MuiSelect-select {
    min-height: unset;
  }
`;

export const RatingField = styled(TextField)`
  input {
    font-size: 16px;
    line-height: 16px;
    ${NumberFields}
    &::placeholder {
      ${PlaceholderStyle}
      opacity: 1;
    }
  }
`;

export const YearField = styled(TextField)`
  /* width: 100%; */

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
  font-size: 16px;
  line-height: 16px;
  height: 30px;
  color: #f8f5f5;
  font-weight: bold;
  cursor: pointer;
`;

export const Error = styled('div')`
  color: red;
  font-size: 12px;
`;
