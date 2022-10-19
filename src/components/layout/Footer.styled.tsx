import { Theme } from '@mui/material';
import { styled, css } from '@mui/material';
import { Container } from '@mui/material';

export const FooterWrapper = styled('div')`
  background-color: #121212;
  font-weight: 500;
`;

export const ContainerStyled = styled(Container)`
  padding: 30px 0 40px;
  display: flex;
  justify-content: space-between;
`;

const templateBlock = ({ theme }: { theme: Theme }) => css`
  h3 {
    color: ${theme.palette.customColor.main};
    margin-bottom: 16px;
    text-transform: uppercase;
    font-size: 18px;
    line-height: 22px;
    font-family: 'Mulish';
  }

  ul {
    svg {
      margin-right: 10px;
    }

    a {
      color: #f8f5f5;
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      font-family: 'Anonymous Pro';
    }
    li:not(:last-child) {
      margin-bottom: 11px;
    }
  }
`;

export const FooterCompany = styled('div')`
  ${templateBlock};
`;

export const FooterQA = styled('div')`
  ${templateBlock};
`;

export const FooterContacts = styled('div')`
  ${templateBlock};
  li {
    display: flex;
    align-items: center;
  }
`;

export const FooterSocialMedias = styled('div')`
  ${templateBlock};
  ul {
    display: flex;
    gap: 17px;
  }
`;

// export const FooterBtn = styled('a')`
//   width: 215px;
//   height: 60px;
//   margin: 0 auto 20px;
//   border: 2px solid #252525;
//   border-radius: 30px;
//   box-sizing: border-box;
//   color: #252525;
//   font-size: 14px;
//   font-weight: 600;
//   letter-spacing: 0;
//   line-height: 19px;
//   text-transform: uppercase;
//   text-align: center;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transition: all 0.5s;

//   &:hover {
//     background-color: #000;
//     color: #fff;
//   }
// `;
