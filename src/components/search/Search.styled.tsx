import { styled } from '@mui/material';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';

export const SearchStyled = styled('div')`
  position: relative;
  margin-right: 58px;
  &.activeSearch {
    svg {
      color: #000;
    }
    > div {
      width: 250px;
      opacity: 1;
    }
  }
`;
export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  color: #fff;
`;

export const StyledInput = styled(Input)`
  background-color: #fff;
  outline: none;
  padding: 3px 5px 3px 30px;
  border-radius: 30px;
  transition: 0.3s;
  font-size: 16px;
  line-height: 16px;
  width: 0;
  opacity: 0;

  input {
    padding: 0;
  }
`;

export const StyledSearchResults = styled('div')`
  position: absolute;
  top: 40px;

  ul {
    background: #fff;

    li {
      border-top: 1px solid rgba(0, 0, 0, 0.15);
    }

    a {
      display: flex;
      align-items: center;
      padding: 5px 10px;
    }

    p {
      color: #959595;
      padding: 10px;
      text-align: center;
    }
  }
`;

export const StyledSmallPosterBlock = styled('div')`
  height: 35px;
  width: 25px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
