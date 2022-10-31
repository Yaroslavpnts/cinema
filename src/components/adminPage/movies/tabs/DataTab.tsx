import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataTable, { EnumTypeData } from '../table/DataTable';
import { useAppSelector } from '../../../../app/hooks';
import { moviesForTable } from '../../../../redux/slices/moviesSlice';
import { actorsForTable } from '../../../../redux/slices/actorsSlice';
import { directorsForTable } from '../../../../redux/slices/directorsSlice';

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

  const [value, setValue] = React.useState('Фільми');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
        <DataTable rows={movies} typeData={EnumTypeData.MOVIES} />
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
