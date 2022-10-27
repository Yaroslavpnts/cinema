import React, { useCallback, useMemo, useState } from 'react';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import { ButtonStyled, Error, FormStyled, GenreBlockStyled, InputBlock } from './GenreForm.style';
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
  btnTitle: string;
}

const GenreForm: React.FC<IProps> = ({ createNew, btnTitle }) => {
  const errorMessage = useAppSelector(genresErrorMessageSelector);

  // const [isAlert, setIsAlert] = useState<boolean>(false);

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
          // setIsAlert(true);
        })
        .catch(() => {
          setStatus('error');
          // setIsAlert(true);
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
          <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
          <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
          {touched.name && errors.name ? <div>{errors.name}</div> : null}
        </InputBlock>
        <ButtonStyled type="submit">{btnTitle}</ButtonStyled>
        {status && notification[status as keyof typeof notification]}
      </FormStyled>
    </GenreBlockStyled>
  );
};

export default GenreForm;
