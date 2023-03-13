import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useFormik } from 'formik';
import { AutocompleteMovies } from './autocompleteMovies/AutocompleteMovies';
import { IApiResponseMovie } from '../../../../../api/apiMethods';
import { RangePickerSessions } from './rangePickerSessions/RangePickerSessions';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import {
  parseCheckedCinemaHall,
  parsePeriodString,
} from '../../../../../app/helpers/helperFunctions';
import SelectCinemaHall from './selectCinemaHall/SelectCinemaHall';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { cinemasByCityNameSelector } from '../../../../../redux/slices/citiesSlice';
import { createSessionsAction } from '../../../../../redux/slices/sessionsSlice';
import {
  AccordionSummaryStyled,
  ButtonStyled,
  FormFieldsBlock,
} from './AccordionCreteSessions.styled';
import { Alert, Snackbar } from '@mui/material';

dayjs.extend(dayOfYear);

export interface initialStateCreateSessionsForm {
  dayStart: dayjs.Dayjs;
  dayEnd: dayjs.Dayjs;
  sessions: {
    [index: string]: { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs };
  };
  cinema_hall_id: number;
  movie_id: number;
}

type Keys = 'dateStart' | 'dateEnd' | 'sessions' | 'cinema_hall_id' | 'movie_id';

interface IAccordionCreteSessionsProps {
  cityName: string;
}

export const AccordionCreteSessions: React.FC<IAccordionCreteSessionsProps> = ({ cityName }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const cinema = useAppSelector(cinemasByCityNameSelector(cityName));

  const [expanded, setExpanded] = useState<string | false>(false);
  const [checkedPeriod, setChekedPeriod] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReadyValue = (isExpanded: boolean) => {
    setExpanded(false);
  };

  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  const [movie, setMovie] = useState<IApiResponseMovie | null>(null);

  const validate = (values: initialStateCreateSessionsForm) => {
    const errors = {} as { [key in Keys]: string };

    if (!values.dayStart) {
      errors.dateStart = 'Потрібно вказати початок періоду';
    }

    if (!values.dayEnd) {
      errors.dateEnd = 'Потрібно вказати кінець періоду';
    }

    const sessionsKeys = Object.keys(values.sessions);

    if (
      sessionsKeys.length === 0 ||
      sessionsKeys.some(key => {
        if (!values.sessions[key].sessionStart.isValid()) {
          return true;
        }

        if (!values.sessions[key].sessionEnd.isValid()) {
          return true;
        }

        return false;
      })
    ) {
      errors.sessions = 'Потрібно вказати хоча б один сеанс';
    }

    if (values.cinema_hall_id === 0) {
      errors.cinema_hall_id = 'Потрібно вказати кінозал';
    }

    if (values.movie_id === 0) {
      errors.movie_id = 'Потрібно вказати фільм';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      dayStart: dayjs().startOf('day'),
      dayEnd: dayjs(),
      sessions: {},
      cinema_hall_id: 0,
      movie_id: 0,
    } as initialStateCreateSessionsForm,
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createSessionsAction(values)).unwrap();
        resetForm();
        setMovie(null);
        setResponseMessage('Сеанс(и) створено');
        setSnackBarOpen(true);
      } catch (error) {
        setResponseMessage('Не вдалося створити сеанс(и)');
      }
    },
  });

  // console.log('values', formik.values);
  // console.log('errors', formik.errors);
  // console.log('touched', formik.touched);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormFieldsBlock>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummaryStyled
              expandIcon={<ExpandMoreIcon />}
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Оберіть фільм</Typography>
              <Typography>{movie?.name}</Typography>
              {formik.values.movie_id && !formik.errors.movie_id ? (
                <CheckCircleIcon sx={{ color: theme.palette.customColor.main }} />
              ) : null}
            </AccordionSummaryStyled>
            <AccordionDetails>
              <AutocompleteMovies
                movie={movie}
                setMovie={setMovie}
                setMovieId={formik.setFieldValue}
                handleReadyValue={handleReadyValue}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Оберіть дату та час сеансу(-ів)
              </Typography>
              <Typography>
                {parsePeriodString(formik.values.dayStart, formik.values.dayEnd, checkedPeriod)}
              </Typography>
              {Object.keys(formik.values.sessions).length > 0 && !formik.errors.sessions ? (
                <CheckCircleIcon sx={{ color: theme.palette.customColor.main }} />
              ) : null}
            </AccordionSummaryStyled>
            <AccordionDetails>
              <RangePickerSessions
                setValue={formik.setFieldValue}
                dayStart={formik.values.dayStart}
                dayEnd={formik.values.dayEnd}
                checkedPeriod={checkedPeriod}
                setChekedPeriod={setChekedPeriod}
                movie={movie}
                sessions={formik.values.sessions}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Оберіть кінозал</Typography>
              <Typography>
                {parseCheckedCinemaHall(cinema, formik.values.cinema_hall_id)}
              </Typography>
              {formik.values.cinema_hall_id !== 0 && !formik.errors.cinema_hall_id ? (
                <CheckCircleIcon sx={{ color: theme.palette.customColor.main }} />
              ) : null}
            </AccordionSummaryStyled>
            <AccordionDetails>
              <Typography component="div">
                <SelectCinemaHall
                  cinemaHalls={cinema?.cinema_halls}
                  setValue={formik.setFieldValue}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </FormFieldsBlock>
        <ButtonStyled type="submit">Створити сеанси</ButtonStyled>
      </form>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
