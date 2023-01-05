import { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { ICategory, IPosition } from '../../../../api/apiMethods';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  createMovieAction,
  movieByIdSelector,
  moviesErrorMessageSelector,
  moviesStatusSelector,
  updateMovieAction,
} from '../../../../redux/slices/moviesSlice';
import { fetchStatus } from '../../../../redux/types';
import Notification from '../../../notification/Notification';
import {
  AddBoxIconStyled,
  ButtonStyled,
  Error,
  FormStyled,
  InputBlock,
  MultipleBlock,
  RatingField,
  StyledTypography,
  YearField,
} from './MovieForm.style';
import {
  createGenreAction,
  fetchGenresAction,
  genresSelector,
} from '../../../../redux/slices/genresSlice';
import PositionForm from './modalForm/PositionForm';
import {
  actorsNamesSelector,
  createActorAction,
  fetchActorsAction,
} from '../../../../redux/slices/actorsSlice';
import {
  createDirectorAction,
  directorsNamesSelector,
  fetchDirectorsAction,
} from '../../../../redux/slices/directorsSlice';
import SelectFilmFields from '../select/multipleSelect/SelectFilmFields';
import CreateModal from '../../../modal/Modal';
import GenreForm from './modalForm/GenreForm';
import { TextareaAutosize } from '@mui/material';
import SingleSelect from '../select/singleSelect/SingleSelect';

const defaultValues = {
  name: '',
  description: '',
  genres: [] as { id: number; name: string }[],
  actors: [] as { id: number; name: string }[],
  directors: [] as { id: number; name: string }[],
  rating: '',
  imdb_rating: '',
  production_year: '',
  wide_poster_src: '',
  poster_src: '',
  duration: '',
};

export type TCreateMovie = typeof defaultValues;

type Keys =
  | 'name'
  | 'description'
  | 'genres'
  | 'actors'
  | 'directors'
  | 'rating'
  | 'imdb_rating'
  | 'production_year'
  | 'poster_src'
  | 'wide_poster_src'
  | 'duration';

const validate = (values: TCreateMovie) => {
  const errors = {} as { [key in Keys]: string };

  if (!values.name) {
    errors.name = 'Потрібно вказати назву фільму';
  }

  if (!values.description) {
    errors.description = 'Потрібно вказати опис фільму';
  }

  if (values.genres.length === 0) {
    errors.genres = 'Потрібно вибрати хоча б один жанр';
  }

  if (values.actors.length === 0) {
    errors.actors = 'Потрібно вибрати хоча б одного актора';
  }

  if (values.directors.length === 0) {
    errors.directors = 'Потрібно вибрати хоча б одного режисера';
  }
  if (!values.rating) {
    errors.rating = 'Потрібно вибрати рейтинг фільму';
  }
  if (!values.imdb_rating) {
    errors.imdb_rating = 'Потрібно вибрати рейтинг IMDB фільму';
  }

  if (!values.production_year) {
    errors.production_year = 'Потрібно вибрати рік виходу фільму';
  }

  if (!values.poster_src) {
    errors.poster_src = 'Потрібно вибрати постер до фільму';
  }

  if (!values.duration) {
    errors.duration = 'Потрібно вказана тривалість фільму';
  }

  return errors;
};

interface IMovieFormProps {
  id?: number;
  title: string;
}

const MovieForm: React.FC<IMovieFormProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();

  const genres = useAppSelector(genresSelector);
  const actors = useAppSelector(actorsNamesSelector);
  const directors = useAppSelector(directorsNamesSelector);
  const movie = useAppSelector(movieByIdSelector(id));

  const initialValues = movie ? movie : defaultValues;

  const createNewCategory = (category: ICategory) => {
    return dispatch(createGenreAction(category)).unwrap();
  };

  const createNewActor = (actor: IPosition) => {
    return dispatch(createActorAction(actor)).unwrap();
  };

  const createNewDirector = (director: IPosition) => {
    return dispatch(createDirectorAction(director)).unwrap();
  };

  const [modalContentKey, setModalContentKey] = useState<'genres' | 'actors' | 'directors' | ''>(
    ''
  );

  const handleClose = (
    e: React.MouseEvent<HTMLElement>,
    reason: 'escapeKeyDown' | 'backdropClick'
  ) => {
    setModalContentKey('');
  };

  const modalContent = useMemo(
    () => ({
      genres: {
        layout: (
          <GenreForm
            createNew={createNewCategory}
            formTitle="Створення нового жанру"
            btnTitle="Створити жанр"
          />
        ),
      },
      actors: {
        layout: (
          <PositionForm
            dispatchMethod={createNewActor}
            formTitle="Створення нового актора"
            btnTitle="Створити актора"
            successMessage="Актор створений"
          />
        ),
      },
      directors: {
        layout: (
          <PositionForm
            dispatchMethod={createNewDirector}
            formTitle="Створення нового режисера"
            btnTitle="Створити режисера"
            successMessage="Режисер створений"
          />
        ),
      },
    }),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values: TCreateMovie, { setStatus, resetForm }) => {
        try {
          if (!movie) {
            await dispatch(createMovieAction(values)).unwrap();
          } else {
            await dispatch(updateMovieAction(values)).unwrap();
          }

          resetForm();
        } catch (error) {}
      }}
    >
      {({ values, touched, setFieldValue, errors, handleChange, handleBlur }) => (
        <FormStyled>
          <StyledTypography variant="h3">{title}</StyledTypography>
          <InputBlock>
            <div>
              <Field name="name" placeholder="Назва фільму" />
              <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <TextareaAutosize
                minRows={3}
                value={values.description}
                onChange={handleChange}
                name="description"
                placeholder="Опис фільму"
                onBlur={handleBlur}
              />
              <ErrorMessage name="city" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <SelectFilmFields
                id="genres"
                name="genres"
                value={values.genres}
                options={genres}
                setFieldValue={setFieldValue}
                title="Жанри"
                placeholderText="Жанри"
              />
              <AddBoxIconStyled onClick={() => setModalContentKey('genres')} />
            </div>
            <div>
              <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <SelectFilmFields
                id="actors"
                name="actors"
                value={values.actors}
                options={actors}
                setFieldValue={setFieldValue}
                title="Актори"
                placeholderText="Актори"
              />
              <AddBoxIconStyled onClick={() => setModalContentKey('actors')} />
            </div>
            <div>
              <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <SelectFilmFields
                id="directors"
                name="directors"
                value={values.directors}
                options={directors}
                setFieldValue={setFieldValue}
                title="Режисери"
                placeholderText="Режисери"
              />
              <AddBoxIconStyled onClick={() => setModalContentKey('directors')} />
            </div>
            <div>
              <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <MultipleBlock>
              <div>
                <SingleSelect name="rating" setFieldValue={setFieldValue} value={values.rating} />
              </div>
              <div>
                <RatingField
                  type="number"
                  name="imdb_rating"
                  value={values.imdb_rating}
                  onChange={handleChange}
                  placeholder="Рейтинг IMDB"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    max: 10,
                    min: 0,
                    step: '0.1',
                  }}
                />
              </div>
              <div>
                <YearField
                  type="number"
                  name="production_year"
                  value={values.production_year}
                  onChange={handleChange}
                  placeholder="Рік випуску"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    max: new Date().getFullYear() + 1,
                    min: 1900,
                    step: '1',
                  }}
                />
                <ErrorMessage name="production_year" render={msg => <Error>{msg}</Error>} />
              </div>
            </MultipleBlock>
          </InputBlock>
          <InputBlock>
            <div>
              <Field name="duration" placeholder="Тривалість фільму (хв)" type="number" min={0} />
              <ErrorMessage name="duration" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <Field name="poster_src" placeholder="Постер до фільму" />
              <ErrorMessage name="poster_src" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <div>
              <Field name="wide_poster_src" placeholder="Афіша до фільму" />
              <ErrorMessage name="wide_poster_src" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <CreateModal
            handleClose={handleClose}
            open={!!modalContentKey}
            // modalTitle={modalContentKey && modalContent[modalContentKey].title}
          >
            {modalContentKey && modalContent[modalContentKey].layout}
          </CreateModal>
          <InputBlock>
            <div>
              <ButtonStyled type="submit">
                {movie ? 'Відредагувати' : 'Створити фільм'}
              </ButtonStyled>
            </div>
          </InputBlock>
        </FormStyled>
      )}
    </Formik>
  );
};

export default MovieForm;
