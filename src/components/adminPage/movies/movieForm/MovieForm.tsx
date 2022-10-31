import { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { ICategory, IPosition } from '../../../../api/apiMethods';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  createMovieAction,
  moviesErrorMessageSelector,
  moviesStatusSelector,
} from '../../../../redux/slices/moviesSlice';
import { fetchStatus } from '../../../../redux/types';
import Notification from '../../../notification/Notification';
import {
  ButtonStyled,
  Error,
  FormStyled,
  InputBlock,
  RatingBlock,
  RatingField,
} from './MovieForm.style';
import {
  createGenreAction,
  fetchGenresAction,
  genresSelector,
} from '../../../../redux/slices/genresSlice';
import PositionForm from './position/PositionForm';
import {
  actorsNamesSelector,
  createActorAction,
  fetchActorsAction,
} from '../../../../redux/slices/actorsSlice';
import {
  createDirectorAction,
  directorsNamesSelector,
  directorsSelector,
  fetchDirectorsAction,
} from '../../../../redux/slices/directorsSlice';
import SelectFilmFields from '../select/multipleSelect/SelectFilmFields';
import CreateModal from '../../../modal/Modal';
import GenreForm from './genre/GenreForm';
import { TextareaAutosize, TextField } from '@mui/material';
import SingleSelect from '../select/singleSelect/SingleSelect';

const initialValues = {
  name: '',
  description: '',
  genres: [] as string[],
  actors: [] as string[],
  directors: [] as string[],
  rating: '',
  imdb_rating: '',
  poster_src: '',
};

export type TCreateMovie = typeof initialValues;

type Keys =
  | 'name'
  | 'description'
  | 'genres'
  | 'actors'
  | 'directors'
  | 'rating'
  | 'imdb_rating'
  | 'poster_src';

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
  if (!values.poster_src) {
    errors.poster_src = 'Потрібно вибрати постер до фільму';
  }

  return errors;
};

const MovieForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const genres = useAppSelector(genresSelector);
  const actors = useAppSelector(actorsNamesSelector);
  const directors = useAppSelector(directorsNamesSelector);

  useEffect(() => {
    dispatch(fetchGenresAction());
    dispatch(fetchActorsAction());
    dispatch(fetchDirectorsAction());
  }, []);

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
        modalTitle: 'Створити жанр',
        layout: <GenreForm createNew={createNewCategory} btnTitle="Створити жанр" />,
      },
      actors: {
        modalTitle: 'Створити актора',
        layout: (
          <PositionForm
            createNew={createNewActor}
            btnTitle="Створити актора"
            sucessMessage="Актор створений"
          />
        ),
      },
      directors: {
        modalTitle: 'Створити режисера',
        layout: (
          <PositionForm
            createNew={createNewDirector}
            btnTitle="Створити режисера"
            sucessMessage="Режисер створений"
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
        console.log(values);
        try {
          await dispatch(createMovieAction(values)).unwrap();
          resetForm();
        } catch (error) {}
      }}
    >
      {({ values, touched, setFieldValue, errors, handleChange, handleBlur }) => (
        <FormStyled>
          <InputBlock>
            <label>Назва фільму</label>
            <div>
              <Field name="name" />
              <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <label>Опис фільму</label>
            <div>
              {/* <Field name="city" as="textarea" ref={InputRef} /> */}
              <TextareaAutosize
                minRows={3}
                value={values.description}
                onChange={handleChange}
                name="description"
                // ref={TextareaRef}
                onBlur={handleBlur}
              ></TextareaAutosize>
              <ErrorMessage name="city" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <label htmlFor="genres">Жанри</label>
            <div>
              <SelectFilmFields
                id="genres"
                name="genres"
                value={values.genres}
                options={genres}
                setFieldValue={setFieldValue}
                title="Жанри"
              />
            </div>
            <AddBoxIcon onClick={() => setModalContentKey('genres')} />
            <div>
              <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <label htmlFor="actors">Актори</label>
            <div>
              <SelectFilmFields
                id="actors"
                name="actors"
                value={values.actors}
                options={actors}
                setFieldValue={setFieldValue}
                title="Актори"
              />
            </div>
            <AddBoxIcon onClick={() => setModalContentKey('actors')} />
            <div>
              <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <label htmlFor="directors">Режисери</label>
            <div>
              <SelectFilmFields
                id="directors"
                name="directors"
                value={values.directors}
                options={directors}
                setFieldValue={setFieldValue}
                title="Режисери"
              />
            </div>
            <AddBoxIcon onClick={() => setModalContentKey('directors')} />
            <div>
              <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <RatingBlock>
              <div>
                <label>Рейтинг</label>
                <SingleSelect name="rating" setFieldValue={setFieldValue} value={values.rating} />
              </div>
              <div>
                <label>Рейтинг IMDB</label>
                <RatingField
                  type="number"
                  name="imdb_rating"
                  value={values.imdb_rating}
                  onChange={handleChange}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    max: 10,
                    min: 0,
                    step: '0.1',
                  }}
                />
              </div>
            </RatingBlock>
          </InputBlock>
          <InputBlock>
            <label>Постер</label>
            <div>
              <Field name="poster_src" />
              <ErrorMessage name="poster_src" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <CreateModal
            handleClose={handleClose}
            open={!!modalContentKey}
            modalTitle={modalContentKey && modalContent[modalContentKey].modalTitle}
          >
            {modalContentKey && modalContent[modalContentKey].layout}
          </CreateModal>
          <InputBlock>
            <div>
              <ButtonStyled type="submit">Створити фільм</ButtonStyled>
            </div>
          </InputBlock>
        </FormStyled>
      )}
    </Formik>
  );
};

export default MovieForm;

// <InputBlock>
//   <label>Жанри</label>
//   {/* <SelectValues
//     name="genres"
//     value={values.genres}
//     options={genres}
//     setFieldValue={setFieldValue}
//     title="Жанри"
//     newItemTitle="Створити новий жанр"
//   >
//     <div>Створити жанр</div>
//   </SelectValues> */}
//   <ErrorMessage name="country" render={msg => <Error>{msg}</Error>} />
// </InputBlock>;
