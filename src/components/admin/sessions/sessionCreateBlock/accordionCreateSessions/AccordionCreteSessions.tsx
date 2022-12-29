import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import { AutocompleteMovies } from './autocompleteMovies/AutocompleteMovies';
import { IApiResponseMovie } from '../../../../../api/apiMethods';
import { RangePickerSessions } from './rangePickerSessions/RangePickerSessions';
import dayjs from 'dayjs';

interface initialState {
  dayStart: '';
  dayEnd: '';
  sessions: { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs }[];
  // sessions: { [sessionStart: string]: string };
  // sessions: { [index: string]: { sessionStart: string; sessionEnd: string }[] };
  cinema_hall_id: number | null;
  movie_id: number | null;
}

type Keys = 'dateStart' | 'dateEnd' | 'sessions' | 'cinema_hall_id' | 'movie_id';

const parsePeriodString = (dateStart: string, dateEnd: string, period: boolean) => {
  return ` ${dateStart === 'Invalid Date' ? 'Неправильно вказана дата' : dateStart} ${
    period ? `- ${dateEnd === 'Invalid Date' ? 'Неправильно вказана дата' : dateEnd}` : ''
  }`;
};

export const AccordionCreteSessions: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [checkedPeriod, setChekedPeriod] = useState(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [movie, setMovie] = useState<IApiResponseMovie | null>(null);

  const validate = (values: initialState) => {
    const errors = {} as { [key in Keys]: string };

    if (!values.dayStart) {
      errors.dateStart = 'Потрібно вказати початок періоду';
    }

    if (!values.dayEnd) {
      errors.dateEnd = 'Потрібно вказати кінець періоду';
    }

    if (Object.keys(values.sessions).length === 0) {
      errors.sessions = 'Потрібно вказати хоча б один сеанс';
    }

    if (!values.cinema_hall_id) {
      errors.dateStart = 'Потрібно вказати кінозал';
    }

    if (!values.movie_id) {
      errors.dateStart = 'Потрібно вказати фільм';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      dayStart: '',
      dayEnd: '',
      sessions: {},
      cinema_hall_id: null,
      movie_id: null,
    } as initialState,
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Оберіть фільм</Typography>
            <Typography>{movie?.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AutocompleteMovies
              movie={movie}
              setMovie={setMovie}
              setMovieId={formik.setFieldValue}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Оберіть дату та час сеансу (-ів)
            </Typography>
            <Typography>
              {parsePeriodString(formik.values.dayStart, formik.values.dayEnd, checkedPeriod)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RangePickerSessions
              setValue={formik.setFieldValue}
              dayStart={formik.values.dayStart}
              dayEnd={formik.values.dayEnd}
              checkedPeriod={checkedPeriod}
              setChekedPeriod={setChekedPeriod}
              movie={movie}
              // touched={formik.touched}
              // errors={formik.errors}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Advanced settings</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography></Typography>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
};
