import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useAppDispatch } from '../../../../app/hooks';
import { deleteActorAction, updateActorAction } from '../../../../redux/slices/actorsSlice';
import { deleteDirectorAction } from '../../../../redux/slices/directorsSlice';
import { deleteMovieAction } from '../../../../redux/slices/moviesSlice';
import {
  StyledEnhancedTableHead,
  StyledTableBody,
  StyledEditIcon,
  StyledLink,
} from './DataTable.styled';
import CreateModal from '../../../modal/Modal';
import MovieForm from '../movieForm/MovieForm';
import PositionForm from '../movieForm/modalForm/PositionForm';
import { IPosition } from '../../../../api/apiMethods';

export enum EnumTypeData {
  MOVIES = 'movies',
  ACTORS = 'actors',
  DIRECTORS = 'directors',
}

enum ColumnType {
  MOVIES = 'movies',
  POSITION = 'position',
}

function descendingComparator(
  a: { [index: string]: string | number },
  b: { [index: string]: string | number },
  orderBy: string
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(order: Order, orderBy: string) {
  return order === 'desc'
    ? (a: { [index: string]: number | string }, b: { [index: string]: number | string }) =>
        descendingComparator(a, b, orderBy)
    : (a: { [index: string]: number | string }, b: { [index: string]: number | string }) =>
        -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  type: ColumnType;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Фільм',
    type: ColumnType.MOVIES,
  },
  {
    id: 'imdb_rating',
    numeric: true,
    disablePadding: false,
    label: 'Рейтинг IMDB',
    type: ColumnType.MOVIES,
  },
  {
    id: 'production_year',
    numeric: true,
    disablePadding: false,
    label: 'Рік випуску',
    type: ColumnType.MOVIES,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: "Ім'я",
    type: ColumnType.POSITION,
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'Місто',
    type: ColumnType.POSITION,
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'Країна',
    type: ColumnType.POSITION,
  },
  {
    id: 'birthday',
    numeric: true,
    disablePadding: false,
    label: 'Дата народження',
    type: ColumnType.POSITION,
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  type: ColumnType;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, type } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <StyledEnhancedTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all movies',
            }}
          />
        </TableCell>
        {headCells.map(headCell => {
          return headCell.type === type ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ color: 'white' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : null;
        })}
        <TableCell padding="checkbox" />
      </TableRow>
    </StyledEnhancedTableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDelete: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} обрано
        </Typography>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface IDataTableProps {
  rows: {
    [index: string]: string | number;
    name: string;
    id: number;
  }[];
  typeData: EnumTypeData;
}

const DataTable: React.FC<IDataTableProps> = ({ rows, typeData }) => {
  const dispatch = useAppDispatch();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [modalContentKey, setModalContentKey] = React.useState<
    'movies' | 'actors' | 'directors' | ''
  >('');

  const [editFormId, setEditFormId] = React.useState<number>(0);

  const modalContent = React.useMemo(
    () => ({
      movies: {
        title: 'Редагування фільму',
        layout: <MovieForm id={editFormId} title="Редагування фільму" />,
      },
      actors: {
        title: 'Редагування актора',
        layout: (
          <PositionForm
            id={editFormId}
            formTitle="Редагування актора"
            btnTitle="Редагувати актора"
            successMessage="Актора відредаговано"
            dispatchMethod={(actor: IPosition) => dispatch(updateActorAction(actor)).unwrap()}
          />
        ),
      },
      directors: {
        title: 'Редагування режисера',
        layout: (
          <PositionForm
            id={editFormId}
            formTitle="Редагування режисера"
            btnTitle="Редагувати режисера"
            successMessage="Режисера відредаговано"
            dispatchMethod={(actor: IPosition) => dispatch(updateActorAction(actor)).unwrap()} //нужно сделать для режисера
          />
        ),
      },
    }),
    [editFormId]
  );

  const handleEdit = (id: number) => {
    setModalContentKey(typeData);
    setEditFormId(id);
  };

  const handleClose = (
    e: React.MouseEvent<HTMLElement>,
    reason: 'escapeKeyDown' | 'backdropClick'
  ) => {
    setEditFormId(0);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    console.log(property);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const deleteMethods = {
    movies: async () => {
      try {
        await dispatch(deleteMovieAction(selected[0])).unwrap();
        setSelected([]);
      } catch (error) {}
    },
    actors: async () => {
      try {
        await dispatch(deleteActorAction(selected[0])).unwrap();
        setSelected([]);
      } catch (error) {}
    },
    directors: async () => {
      try {
        await dispatch(deleteDirectorAction(selected[0])).unwrap();
        setSelected([]);
      } catch (error) {}
    },
  };

  const handleDelete = async () => {
    deleteMethods[typeData]();
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              type={typeData === EnumTypeData.MOVIES ? ColumnType.MOVIES : ColumnType.POSITION}
            />
            <StyledTableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => handleClick(event, row.name)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {typeData === EnumTypeData.MOVIES && (
                          <StyledLink to={`/movies/${row.id}`}>{row.name}</StyledLink>
                        )}
                        {typeData === EnumTypeData.ACTORS && (
                          <StyledLink to={`/actors/${row.id}`}>{row.name}</StyledLink>
                        )}
                        {typeData === EnumTypeData.DIRECTORS && (
                          <StyledLink to={`/directors/${row.id}`}>{row.name}</StyledLink>
                        )}
                      </TableCell>

                      {typeData === EnumTypeData.MOVIES && (
                        <>
                          <TableCell align="right">{row.imdb_rating}</TableCell>
                          <TableCell align="right">{row.production_year}</TableCell>
                        </>
                      )}
                      {(typeData === EnumTypeData.ACTORS ||
                        typeData === EnumTypeData.DIRECTORS) && (
                        <>
                          <TableCell align="right">{row.city}</TableCell>
                          <TableCell align="right">{row.country}</TableCell>
                          <TableCell align="right">{row.birthday}</TableCell>
                        </>
                      )}
                      <TableCell>
                        <StyledEditIcon onClick={() => handleEdit(row.id)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </StyledTableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          labelRowsPerPage="Рядків на сторінку"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          sx={{
            backgroundColor: '#E9E9E9',
            '.MuiToolbar-root': {
              fontFamily: 'Mulish',
              fontSize: '24px',
              lineHeight: '28.8px',
            },
            '.MuiTablePagination-selectLabel': {
              fontFamily: 'inherit',
              fontSize: '24px',
              lineHeight: '28.8px',
            },
            '.MuiInputBase-root': {
              fontFamily: 'inherit',
              fontSize: '24px',
            },
            '.MuiTablePagination-displayedRows': {
              fontFamily: 'inherit',
              fontSize: '24px',
              lineHeight: '28.8px',
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <CreateModal
        handleClose={handleClose}
        open={!!editFormId}
        // modalTitle={modalContentKey && modalContent[typeData].title}
      >
        {modalContentKey && modalContent[modalContentKey].layout}
        {/* {editMovieId && <MovieForm id={editMovieId} title="Редагування фільму" />} */}
      </CreateModal>
    </Box>
  );
};

export default DataTable;
