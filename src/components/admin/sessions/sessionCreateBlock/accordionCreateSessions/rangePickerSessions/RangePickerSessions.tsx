import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  AddCircleOutlineIconStyled,
  AddSessionBlockStyled,
  DateBlockStyled,
  DatePickerSessionStyled,
  RemoveCircleOutlineIconStyled,
  // IconButtonStyled,
  SessionBlock,
  SessionStyled,
  SwithStyled,
  TimeSessionsPickerStyled,
} from './RangePickerSessions.styled';
import { IApiResponseMovie } from '../../../../../../api/apiMethods';
import { parseTimeString } from '../../../../../../app/helpers/helperFunctions';
import { useTheme } from '@mui/material/styles';

interface IRangePickerSessionsProps {
  setValue: (
    field: string,
    value:
      | string
      | Date
      | dayjs.Dayjs
      | {
          [index: string]: { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs };
        },
    shouldValidate?: boolean | undefined
  ) => void;
  sessions: {
    [index: string]: { sessionStart: dayjs.Dayjs; sessionEnd: dayjs.Dayjs };
  };
  dayStart: dayjs.Dayjs | null;
  dayEnd: dayjs.Dayjs | null;
  checkedPeriod: boolean;
  setChekedPeriod: (checked: boolean) => void;
  movie: IApiResponseMovie | null;
}

export const RangePickerSessions: React.FC<IRangePickerSessionsProps> = ({
  setValue,
  dayStart,
  dayEnd,
  sessions,
  checkedPeriod,
  setChekedPeriod,
  movie,
}) => {
  const theme = useTheme();

  const handleChecked = () => {
    setChekedPeriod(!checkedPeriod);
  };

  const handleSetStartPeriod = (value: Date | null) => {
    if (value) {
      setValue('dayStart', value, true);

      if (!checkedPeriod) {
        setValue('dayEnd', value, true);
      }
    } else {
      setValue('dayStart', dayjs(null));
      setValue('dayEnd', dayjs(null));
    }
  };

  const handleSetEndPeriod = (value: Date | null) => {
    if (value) {
      setValue('dayEnd', value, true);
    } else {
      setValue('dayEnd', dayjs(null));
    }
  };

  const handleAddSessionBtnClick = () => {
    const id = uuidv4();

    setValue('sessions', {
      ...sessions,
      [id]: { sessionStart: dayjs(null), sessionEnd: dayjs(null) },
    });
  };

  const handleSetSession = (key: string) => (newTime: string | null) => {
    console.log('i am here', newTime);
    if (newTime) {
      const sessionStart = newTime as unknown as dayjs.Dayjs;
      const movieDuration = movie?.duration ? movie?.duration : 0;
      const sessionEnd = sessionStart.add(Number(movieDuration) + 15, 'minute');

      setValue('sessions', { ...sessions, [key]: { sessionStart, sessionEnd } });
    } else {
      setValue('sessions', {
        ...sessions,
        [key]: { sessionStart: dayjs(null), sessionEnd: dayjs(null) },
      });
    }
  };

  const handleRemoveSession = (key: string) => {
    const sessionsCopy = sessions;
    delete sessionsCopy[key];
    setValue('sessions', { ...sessionsCopy });
  };

  return (
    <DatePickerSessionStyled>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateBlockStyled>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2">Один день</Typography>
            <SwithStyled
              checked={checkedPeriod}
              onChange={handleChecked}
              inputProps={{ 'aria-label': 'ant design' }}
              sx={{ color: theme.palette.customColor.main }}
            />
            <Typography variant="subtitle2">Період</Typography>
          </Stack>
          <DesktopDatePicker
            onChange={handleSetStartPeriod}
            value={dayStart}
            inputFormat="DD-MM-YYYY"
            minDate={new Date()}
            label="Дата початку сеансів"
            renderInput={params => <TextField {...params} name="dayStart" variant="standard" />}
          />
          {checkedPeriod && (
            <DesktopDatePicker
              onChange={handleSetEndPeriod}
              value={dayEnd}
              inputFormat="DD-MM-YYYY"
              minDate={dayStart ? new Date(dayStart.valueOf()) : new Date()}
              label="Дата кінця сеансів"
              renderInput={params => <TextField {...params} name="dayEnd" variant="standard" />}
            />
          )}
        </DateBlockStyled>
        <AddSessionBlockStyled>
          <span>Додати сеанс</span>
          <AddCircleOutlineIconStyled onClick={handleAddSessionBtnClick} fontSize="large" />
        </AddSessionBlockStyled>
        <TimeSessionsPickerStyled>
          {Object.keys(sessions).map(key => {
            return (
              <SessionStyled key={key}>
                <SessionBlock>
                  <TimePicker
                    value={dayjs(sessions[key].sessionStart)}
                    onChange={handleSetSession(key)}
                    renderInput={params => {
                      return <TextField {...params} />;
                    }}
                  />
                  <RemoveCircleOutlineIconStyled
                    onClick={() => handleRemoveSession(key)}
                    fontSize="large"
                  />
                </SessionBlock>

                <span>
                  {sessions[key].sessionEnd && parseTimeString(sessions[key].sessionEnd, movie)}
                </span>
              </SessionStyled>
            );
          })}
        </TimeSessionsPickerStyled>
      </LocalizationProvider>
    </DatePickerSessionStyled>
  );
};
