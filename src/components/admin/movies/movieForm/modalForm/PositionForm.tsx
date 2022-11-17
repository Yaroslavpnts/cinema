import React, { useMemo, useState } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import { IApiResponseActor, IApiResponseDirector, IPosition } from '../../../../../api/apiMethods';
import { actorById, actorsErrorMessageSelector } from '../../../../../redux/slices/actorsSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import Notification from '../../../../notification/Notification';
import { CreateBlockStyled, FormStyled, InputBlock, ButtonStyled, Error } from './modalForm.style';
import Typography from '@mui/material/Typography';

const defaultValues = {
  name: '',
  birthday: '',
  city: '',
  country: '',
  photo_src: '',
};

export type TCreatePosition = typeof defaultValues;

interface IProps {
  dispatchMethod: (value: IPosition) => Promise<IApiResponseActor | IApiResponseDirector>;
  formTitle: string;
  btnTitle: string;
  successMessage: string;
  id?: number;
}

const PositionForm: React.FC<IProps> = ({
  dispatchMethod,
  formTitle,
  btnTitle,
  successMessage,
  id,
}) => {
  const errorMessage = useAppSelector(actorsErrorMessageSelector);

  const actor = useAppSelector(actorById(id));

  const initialValues = actor ? actor : defaultValues;

  const validate = (values: IPosition) => {
    const errors = {} as IPosition;
    if (!values.name) {
      errors.name = "Треба вказати ім'я";
    }
    if (!values.birthday) {
      errors.birthday = 'Треба вказати дату народження';
    }
    if (!values.city) {
      errors.city = 'Треба вказати місто';
    }
    if (!values.country) {
      errors.country = 'Треба вказати країну';
    }
    if (!values.photo_src) {
      errors.photo_src = 'Треба вставити посилання на фото';
    } else if (
      !values.photo_src.match(
        // /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
      )
    ) {
      errors.photo_src = 'Посилання не є валідним';
    }
    return errors;
  };

  const {
    values,
    setStatus,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    status,
    setFieldValue,
    touched,
    resetForm,
  } = useFormik({
    initialValues,
    validate,
    enableReinitialize: true,
    onSubmit: (values, { setStatus }) => {
      dispatchMethod(values)
        .then(() => {
          setStatus('success');
        })
        .catch(() => {
          setStatus('error');
        })
        .finally();
    },
  });

  const notification = useMemo(
    () => ({
      success: (
        <Notification
          severity="success"
          isOpen={status === 'success'}
          setIsOpen={() => setStatus('')}
        >
          {successMessage}
        </Notification>
      ),
      error: (
        <Notification severity="error" isOpen={status === 'error'} setIsOpen={() => setStatus('')}>
          {errorMessage}
        </Notification>
      ),
    }),
    [status]
  );

  return (
    // <ActorBlockStyled>
    <CreateBlockStyled>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h3"
          sx={{ textAlign: 'center', fontFamily: 'Mulish', marginBottom: '20px' }}
        >
          {formTitle}
        </Typography>
        <FormStyled onSubmit={handleSubmit}>
          <InputBlock>
            <label>Прізвище та ім'я</label>
            <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
            {touched.name && errors.name ? <Error>{errors.name}</Error> : null}
          </InputBlock>
          <InputBlock>
            <DesktopDatePicker
              onChange={value => {
                const date = dayjs(value).format('YYYY-MM-DD');
                setFieldValue('birthday', date, true);
              }}
              value={values.birthday}
              inputFormat="DD-MM-YYYY"
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
              label="Дата народження"
              renderInput={params => (
                <TextField
                  {...params}
                  sx={{
                    '.MuiInputBase-root': {
                      '&:hover': {
                        ':not(.Mui-disabled)': {
                          '&::before': {
                            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                          },
                        },
                      },

                      '&::after': {
                        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                      },
                    },
                    '.MuiFormHelperText-root': {
                      color: 'red',
                      textAlign: 'center',
                    },
                  }}
                  error={!!(touched.birthday && errors.birthday)}
                  helperText={errors.birthday}
                  name="birthday"
                  variant="standard"
                />
              )}
            />
          </InputBlock>
          <InputBlock>
            <label>Місто</label>
            <input name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} />
            {touched.city && errors.city ? <Error>{errors.city}</Error> : null}
          </InputBlock>
          <InputBlock>
            <label>Країна</label>
            <input
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.country && errors.country ? <Error>{errors.country}</Error> : null}
          </InputBlock>
          <InputBlock>
            <label>Фото</label>
            <input
              name="photo_src"
              value={values.photo_src}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.photo_src && errors.photo_src ? <Error>{errors.photo_src}</Error> : null}
          </InputBlock>
          <ButtonStyled type="submit">{btnTitle}</ButtonStyled>
          {status && notification[status as keyof typeof notification]}
        </FormStyled>
      </LocalizationProvider>
    </CreateBlockStyled>
  );
};

export default PositionForm;
