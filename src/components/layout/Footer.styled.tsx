import { Theme } from '@mui/material';
import { styled, css } from '@mui/material';
import { Container } from '@mui/material';

export const FooterWrapper = styled('div')`
  background-color: #121212;
  font-weight: 500;
`;

export const ContainerStyled = styled(Container)`
  padding: 30px 0 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: 25px;

  @media (max-width: 600px) {
    padding: 15px 20px 15px;
  }

  @media (max-width: 535px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 15px 20px 15px;
  }

  /* @media (max-width: 535px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  } */
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

    @media (max-width: 535px) {
      display: flex;
      gap: 24px;
    }
  }

  @media (max-width: 535px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const templateList = css`
  @media (max-width: 488px) {
    ul {
      flex-wrap: wrap;
    }

    li {
      width: 100%;
      text-align: center;
    }
  }
`;

export const FooterCompany = styled('div')`
  ${templateBlock};
  ${templateList};
`;

export const FooterQA = styled('div')`
  ${templateBlock};
  ${templateList};
`;

export const FooterContacts = styled('div')`
  ${templateBlock};
  ul {
    flex-direction: column;
  }

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
