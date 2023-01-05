import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DataTable, { EnumTypeData } from '../table/DataTable';
import { useAppSelector } from '../../../../app/hooks';
import { moviesForTable } from '../../../../redux/slices/moviesSlice';
import { actorsForTable } from '../../../../redux/slices/actorsSlice';
import { directorsForTable } from '../../../../redux/slices/directorsSlice';
import { Api } from '../../../../api/apiMethods';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DataTab = () => {
  const movies = useAppSelector(moviesForTable);
  const actors = useAppSelector(actorsForTable);
  const directors = useAppSelector(directorsForTable);

  // const [pageMovies, setPageMovies] = useState(0);
  // const [rowsPerPageMovies, setRowsPerPageMovies] = useState(5);
  // const [movies, setMovies] = useState<
  //   {
  //     [index: string]: string | number;
  //     name: string;
  //     id: number;
  //   }[]
  // >([]);
  // const [totalMovies, setTotalMovies] = useState(0);

  // const [pageActors, setPageActors] = useState(0);
  // const [rowsPerPageActors, setRowsPerPageActors] = useState(5);
  // const [actors, setActors] = useState([]);
  // const [totalActors, setTotalActors] = useState(0);

  // const [pageDirectors, setPageDirectors] = useState(0);
  // const [rowsPerPageDirectors, setRowsPerPageDirectors] = useState(5);
  // const [directors, setDirectors] = useState([]);
  // const [totalDirectors, setTotalDirectors] = useState(0);

  const [value, setValue] = useState('Фільми');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   const fetchRows = async () => {
  //     try {
  //       const { data } = await Api.fetchMovies(pageMovies, rowsPerPageMovies);
  //       setMovies(
  //         data.content.map(movie => ({
  //           id: movie.id,
  //           name: movie.name,
  //           imdb_rating: Number(movie.imdb_rating),
  //           production_year: Number(movie.production_year),
  //         }))
  //       );
  //       setTotalMovies(data.totalCount);
  //     } catch (error) {}
  //   };
  //   fetchRows();
  // }, [pageMovies, rowsPerPageMovies]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Фільми" {...a11yProps('Фільми')} value="Фільми" />
          <Tab label="Актори" {...a11yProps('Актори')} value="Актори" />
          <Tab label="Режисери" {...a11yProps('Режисери')} value="Режисери" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={'Фільми'}>
        <DataTable
          rows={movies}
          typeData={EnumTypeData.MOVIES}
          // page={pageMovies}
          // rowsPerPage={rowsPerPageMovies}
          // setPage={setPageMovies}
          // setRowsPerPage={setRowsPerPageMovies}
          // totalMovies={totalMovies}
        />
      </TabPanel>
      <TabPanel value={value} index={'Актори'}>
        <DataTable rows={actors} typeData={EnumTypeData.ACTORS} />
      </TabPanel>
      <TabPanel value={value} index={'Режисери'}>
        <DataTable rows={directors} typeData={EnumTypeData.DIRECTORS} />
      </TabPanel>
    </Box>
  );
};

export default DataTab;
