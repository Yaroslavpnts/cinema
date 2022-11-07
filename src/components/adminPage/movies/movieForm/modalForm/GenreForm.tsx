import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { ButtonStyled, Error, FormStyled, GenreBlockStyled, InputBlock } from './modalForm.style';
import { IApiResponseCategory, ICategory } from '../../../../../api/apiMethods';
import Notification from '../../../../notification/Notification';
import { useAppSelector } from '../../../../../app/hooks';
import { genresErrorMessageSelector } from '../../../../../redux/slices/genresSlice';

const initialValues = {
  name: '',
};

type TInititalValues = typeof initialValues;

interface IProps {
  createNew: (value: ICategory) => Promise<IApiResponseCategory>;
  title: string;
}

const GenreForm: React.FC<IProps> = ({ createNew, title }) => {
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
        <ButtonStyled type="submit">{title}</ButtonStyled>
        {status && notification[status as keyof typeof notification]}
      </FormStyled>
    </GenreBlockStyled>
  );
};

export default GenreForm;
