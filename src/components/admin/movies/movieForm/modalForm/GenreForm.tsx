import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { ButtonStyled, Error, FormStyled, GenreBlockStyled, InputBlock } from './modalForm.style';
import { IApiResponseCategory, ICategory } from '../../../../../api/apiMethods';
import Notification from '../../../../notification/Notification';
import { useAppSelector } from '../../../../../app/hooks';
import { genresErrorMessageSelector } from '../../../../../redux/slices/genresSlice';
import Typography from '@mui/material/Typography';

const initialValues = {
  name: '',
};

type TInititalValues = typeof initialValues;

interface IProps {
  createNew: (value: ICategory) => Promise<IApiResponseCategory>;
  formTitle: string;
  btnTitle: string;
}

const GenreForm: React.FC<IProps> = ({ createNew, formTitle, btnTitle }) => {
  const errorMessage = useAppSelector(genresErrorMessageSelector);

  const validate = (values: TInititalValues) => {
    const errors = {} as TInititalValues;

    if (!values.name) {
      errors.name = 'Треба вказати жанр';
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
      createNew(values)
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
          Жанр створено
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
    <GenreBlockStyled>
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
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Назва"
          />
          {touched.name && errors.name ? <Error>{errors.name}</Error> : null}
        </InputBlock>
        <ButtonStyled type="submit">{btnTitle}</ButtonStyled>
        {status && notification[status as keyof typeof notification]}
      </FormStyled>
    </GenreBlockStyled>
  );
};

export default GenreForm;
