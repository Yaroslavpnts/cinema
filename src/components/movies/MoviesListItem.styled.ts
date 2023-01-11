import { css, styled, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FlexBoxCenter } from '../../theme/template';

export const Card = styled('div')`
  ${FlexBoxCenter}
  flex-direction: column;
`;

export const SkeletonCard = styled('div')`
  ${FlexBoxCenter}
  flex-direction: column;
`;

export const RotatingPart = styled('div')`
  width: 220px;
  height: 300px;
  position: relative;
  perspective: 600px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover > div:first-of-type {
    transform: rotateY(180deg);
  }

  &:hover > div:last-of-type {
    transform: rotateY(360deg);
  }
`;

const position = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transition: 0.8s;
`;

export const FrontSide = styled('div')`
  ${position};
`;

export const BackSide = styled('div')`
  ${position};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transform: rotateY(180deg);
  padding: 10px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 20%);
`;

export const MovieImgWrapper = styled('div')<{ url: string }>`
  width: 220px;
  height: 300px;
  /* background-image: url(${props => props.url}); */
`;

export const CardImg = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MovieTitle = styled(Typography)`
  font-size: 16px;
  color: ${props => props.theme.palette.customColor.main};
  text-align: center;
  font-weight: 700;
  margin: 10px 0 50px;
`;

export const MovieImdb = styled('div')`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  img {
    display: inline-block;
    height: 17px;
    margin-right: 10px;
  }

  div {
    display: flex;
    align-items: flex-end;
  }

  span:nth-last-of-type(1) {
    line-height: 21px;
    font-size: 10px;
    margin-right: 60px;
    position: relative;
  }
`;

export const IconStyled = styled(FavoriteIcon)`
  position: relative;
  padding: 6px;
  width: 2rem;
  height: 2rem;
  border: 1.5px solid ${props => props.theme.palette.customColor.main};
  border-radius: 50%;
  transition: 0.2s ease;

  &:hover {
    padding: 3px;
  }
`;

const SubTitle = css`
  color: #b6b6b6;
  font-size: 10px;
  text-transform: lowercase;
  margin-bottom: 3px;
`;

export const MovieGenres = styled('div')`
  font-size: 12px;
  margin-bottom: 10px;

  div {
    ${SubTitle}
  }
`;

export const MovieDirectors = styled('div')`
  font-size: 12px;

  div {
    ${SubTitle}
  }
`;

export const ListItemName = styled('span')`
  color: #000;
`;
