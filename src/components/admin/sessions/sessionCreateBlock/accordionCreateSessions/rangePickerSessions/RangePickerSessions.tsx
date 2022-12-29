import React, { useRef, useState } from 'react';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { Stack, Switch, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  DateBlockStyled,
  DatePickerSessionStyled,
  SessionStyled,
  TimeSessionsPickerStyled,
} from './RangePickerSessions.styled';
import { IApiResponseMovie } from '../../../../../../api/apiMethods';
import { parseTimeString } from '../../../../../../app/helpers/helperFunctions';

interface IRangePickerSessionsProps {
  setValue: (
    field: string,
    value: string | { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs }[],
    shouldValidate?: boolean | undefined
  ) => void;
  dayStart: string;
  dayEnd: string;
  checkedPeriod: boolean;
  setChekedPeriod: (checked: boolean) => void;
  movie: IApiResponseMovie | null;
}

export const RangePickerSessions: React.FC<IRangePickerSessionsProps> = ({
  setValue,
  dayStart,
  dayEnd,
  checkedPeriod,
  setChekedPeriod,
  movie,
  // touched,
  // errors,
}) => {
  const handleChecked = () => {
    setChekedPeriod(!checkedPeriod);
  };

  const counter = useRef(0);

  const [sessionsValue, setSessionsValue] = useState<{
    [index: string]: { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs };
  }>({});

  const handleAddSessionBtnClick = () => {
    setSessionsValue({ ...sessionsValue, [counter.current]: { sessionStart: '', sessionEnd: '' } });
    counter.current = counter.current += 1;
  };

  const handleSetSession = (i: number) => (newTime: string | null) => {
    const sessionStart = newTime as unknown as dayjs.Dayjs;

    const movieDuration = movie?.duration ? movie?.duration : 0;
    const sessionEnd = sessionStart.add(Number(movieDuration) + 15, 'minute');

    console.log('sessionEnd', sessionEnd);

    setSessionsValue({ ...sessionsValue, [i.toString()]: { sessionStart, sessionEnd } });
  };

  return (
    <DatePickerSessionStyled>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateBlockStyled>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Один день</Typography>
            <Switch
              checked={checkedPeriod}
              onChange={handleChecked}
              inputProps={{ 'aria-label': 'ant design' }}
            />
            <Typography>Період</Typography>
          </Stack>
          <DesktopDatePicker
            onChange={value => {
              const date = dayjs(value).format('YYYY-MM-DD');
              setValue('dayStart', date, true);
            }}
            value={dayStart}
            inputFormat="DD-MM-YYYY"
            minDate={new Date('1900-01-01')}
            label="Дата початку сеансів"
            renderInput={params => <TextField {...params} name="dayStart" variant="standard" />}
          />
          {checkedPeriod && (
            <DesktopDatePicker
              onChange={value => {
                const date = dayjs(value).format('YYYY-MM-DD');
                setValue('dayEnd', date, true);
              }}
              value={dayEnd}
              inputFormat="DD-MM-YYYY"
              minDate={new Date('1900-01-01')}
              label="Дата кінця сеансів"
              renderInput={params => <TextField {...params} name="dayEnd" variant="standard" />}
            />
          )}
        </DateBlockStyled>

        <TimeSessionsPickerStyled>
          {Object.keys(sessionsValue).map((key, i) => {
            console.log(sessionsValue[key].sessionStart);
            console.log(sessionsValue[key].sessionEnd);
            console.log('duration', movie?.duration);
            return (
              <SessionStyled>
                <TimePicker
                  key={key}
                  value={dayjs(sessionsValue[key].sessionStart)}
                  onChange={handleSetSession(i)}
                  renderInput={params => <TextField {...params} />}
                />
                <span>
                  {sessionsValue[key].sessionEnd && parseTimeString(sessionsValue[key].sessionEnd)}
                </span>
              </SessionStyled>
            );
          })}
          <AddCircleOutlineIcon sx={{ color: 'blue' }} onClick={handleAddSessionBtnClick} />
        </TimeSessionsPickerStyled>
      </LocalizationProvider>
    </DatePickerSessionStyled>
  );
};
