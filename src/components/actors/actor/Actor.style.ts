import { styled } from '@mui/material';

export const StyledActor = styled('div')`
  padding-top: 75px;
`;

export const StyledActorInfo = styled('div')`
  display: flex;
  padding-bottom: 70px;
`;

export const StyledPhotoBlock = styled('div')`
  width: 225px;
  height: 285px;
  margin-right: 95px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledBiographyActor = styled('div')`
  h2 {
    color: #222222;
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 45px;
    margin-bottom: 80px;
    text-transform: uppercase;
  }

  div {
    /* max-width: 400px; */
    h3 {
      font-family: 'Mulish';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
  }
`;

export const StyledPersonalInfo = styled('div')`
  display: flex;
  gap: 105px;
  p {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;

    letter-spacing: 0.03em;
    color: #222222;

    display: flex;
    gap: 103px;

    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
`;

export const StyledActorSliderBlock = styled('div')`
  border-top: 2px solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;
  padding: 20px 0 70px;
  margin-bottom: 50px;
  h3 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    text-transform: uppercase;
    color: #222222;
    margin-bottom: 20px;
    text-align: center;
  }
`;
