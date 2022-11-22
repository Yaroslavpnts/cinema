import { TextField } from '@mui/material';
import { replace, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { userDataType } from '../../api/apiMethods';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  isAuthSelector,
  logInAppAction,
  signUpAction,
} from '../../redux/slices/authorizationSlice';
import {
  BtnSendValues,
  BtnShowForm,
  CustomInput,
  FormEnter,
  FormRegistration,
} from './AuthForm.styled';

enum TypeAuth {
  ENTER = 'enter',
  REGISTRATION = 'registration',
}

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  // const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { type } = useParams();

  const [isShowEnter, setIsShowEnter] = useState<boolean>(type === TypeAuth.ENTER);
  const [isShowRegistration, setIsShowRegistration] = useState<boolean>(
    type === TypeAuth.REGISTRATION
  );

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/');
  //   }
  // }, [isAuth]);

  const initialValues: userDataType = { email: '', password: '' };

  const validate = (values: userDataType) => {
    const errors = {} as userDataType;
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль має бути не менше ніж 6 символів';
    } else if (values.password.length > 33) {
      errors.password = 'Пароль має бути не більше ніж 32 символи';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Некоректна e-mail адреса';
    }

    // const EMAIL_REGEXP =
    //   /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return errors;
  };

  const formikEnter = useFormik({
    initialValues,
    validate,
    onSubmit: async (values: userDataType, { setStatus, setSubmitting }) => {
      const payload = {
        userData: values,
        setStatus,
      };
      try {
        await dispatch(logInAppAction(payload)).unwrap();
        navigate(from, { replace: true });
      } catch (error) {}

      setSubmitting(false);
    },
  });

  const formikRegistration = useFormik({
    initialValues,
    // validate,
    onSubmit: (values: userDataType, { setStatus, setSubmitting }) => {
      const payload = {
        userData: values,
        setStatus,
      };
      dispatch(signUpAction(payload));
      setSubmitting(false);
    },
  });

  const btnEnterHandler = () => {
    setIsShowEnter(!isShowEnter);
    setIsShowRegistration(false);
  };
  const btnRegistrationHandler = () => {
    setIsShowRegistration(!isShowRegistration);
    setIsShowEnter(false);
  };

  useEffect(() => {
    setIsShowEnter(type === TypeAuth.ENTER);
    setIsShowRegistration(type === TypeAuth.REGISTRATION);
  }, [type]);

  return (
    <>
      <form onSubmit={formikEnter.handleSubmit} autoComplete="off">
        <BtnShowForm variant="outlined" onClick={btnEnterHandler}>
          Вхід
        </BtnShowForm>
        <FormEnter className={isShowEnter ? 'show-enter' : ''}>
          <TextField
            error={!!formikEnter.errors.email}
            type="email"
            id="email"
            label="email"
            variant="standard"
            name="email"
            value={formikEnter.values.email}
            onChange={formikEnter.handleChange}
            onBlur={formikEnter.handleBlur}
            fullWidth
            required
            helperText={
              formikEnter.touched.email && formikEnter.errors.email ? formikEnter.errors.email : ''
            }
            sx={{ mb: 2 }}
            autoComplete="off"
          />
          <TextField
            error={!!formikEnter.errors.password}
            type="password"
            id="password"
            label="password"
            variant="standard"
            name="password"
            value={formikEnter.values.password}
            onChange={formikEnter.handleChange}
            onBlur={formikEnter.handleBlur}
            fullWidth
            required
            autoComplete="off"
            helperText={
              formikEnter.touched.password && formikEnter.errors.password
                ? formikEnter.errors.password
                : ''
            }
          />
          <BtnSendValues variant="contained" type="submit" disabled={formikEnter.isSubmitting}>
            Увійти
          </BtnSendValues>
          <div>{formikEnter.status}</div>
        </FormEnter>
      </form>

      <form onSubmit={formikRegistration.handleSubmit}>
        <BtnShowForm variant="outlined" onClick={btnRegistrationHandler}>
          Реєстрація
        </BtnShowForm>
        <FormRegistration className={isShowRegistration ? 'opened' : ''}>
          <CustomInput
            placeholder="e-mail"
            fullWidth
            type="email"
            id="email1"
            name="email"
            value={formikRegistration.values.email}
            onChange={formikRegistration.handleChange}
            onBlur={formikRegistration.handleBlur}
            autoComplete="off"
          />
          <CustomInput
            placeholder="придумай пароль"
            fullWidth
            type="password"
            id="password1"
            name="password"
            value={formikRegistration.values.password}
            onChange={formikRegistration.handleChange}
            onBlur={formikRegistration.handleBlur}
            autoComplete="disabled"
          />
          <BtnSendValues
            variant="contained"
            type="submit"
            disabled={formikRegistration.isSubmitting}
          >
            Зареєструватись
          </BtnSendValues>
          <div>{formikRegistration.status}</div>
        </FormRegistration>
      </form>
    </>
  );
};

export default AuthForm;
