import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export const StyledEnhancedTableHead = styled(TableHead)`
  background-color: #252525;

  .MuiTableCell-root {
    color: #f4f4f4;
    font-family: 'Mulish';

    .PrivateSwitchBase-input {
      background-color: #fff;
    }
    .MuiTableSortLabel-root {
      font-size: 24px;
      line-height: 28.8px;

      &:hover {
        color: #81cff0;
      }
    }

    .Mui-active {
      color: ${props => props.theme.palette.customColor.main};
    }

    .MuiSvgIcon-root {
      fill: #fff;
    }
  }
`;

export const StyledTableBody = styled(TableBody)`
  .MuiTableCell-root {
    font-family: 'Anonymous Pro';
    font-size: 24px;
    line-height: 28.8px;
  }
`;

export const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  color: #3cb4e7;
  &:visited {
    color: #3cb4e7;
  }
`;
