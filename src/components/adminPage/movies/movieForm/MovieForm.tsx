import { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { ICategory, IPosition } from '../../../../api/apiMethods';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  moviesErrorMessageSelector,
  moviesStatusSelector,
} from '../../../../redux/slices/moviesSlice';
import { fetchStatus } from '../../../../redux/types';
import Notification from '../../../notification/Notification';
import { ButtonStyled, Error, FormStyled, InputBlock } from './MovieForm.style';
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
import SelectFilmFields from '../select/SelectFilmFields';
import CreateModal from '../../../modal/Modal';
import GenreForm from './genre/GenreForm';

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

export type ICreateMovie = typeof initialValues;

const MovieForm: React.FC = () => {
  // const status = useAppSelector(moviesStatusSelector);
  // const errorMessage = useAppSelector(moviesErrorMessageSelector);

  // const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();

  const genres = useAppSelector(genresSelector);
  const actors = useAppSelector(actorsNamesSelector);
  const directors = useAppSelector(directorsNamesSelector);

  useEffect(() => {
    dispatch(fetchGenresAction());
  }, []);

  useEffect(() => {
    dispatch(fetchActorsAction());
  }, []);

  useEffect(() => {
    dispatch(fetchDirectorsAction());
  }, []);

  const TextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const TextareaHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLTextAreaElement;
      if (target) {
        target.style.cssText = 'height:auto; padding:7px 7px';
        let height = target.scrollHeight;
        target.style.height = `${height}px`;
      }
    };

    TextareaHandler({ target: TextareaRef.current } as KeyboardEvent);

    TextareaRef.current!.addEventListener('keyup', TextareaHandler);
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
        layout: <PositionForm createNew={createNewActor} btnTitle="Створити актора" />,
      },
      directors: {
        modalTitle: 'Створити режисера',
        layout: <PositionForm createNew={createNewDirector} btnTitle="Створити режисера" />,
      },
    }),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      // validate={validate}
      onSubmit={(values: ICreateMovie) => {
        console.log(values);
        // dispatch(createActor(values));
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
              <textarea
                value={values.description}
                onChange={handleChange}
                name="description"
                ref={TextareaRef}
                onBlur={handleBlur}
              ></textarea>
              <ErrorMessage name="city" render={msg => <Error>{msg}</Error>} />
            </div>
          </InputBlock>
          <InputBlock>
            <label>Жанри</label>
            <div>
              <SelectFilmFields
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
            <label>Актори</label>
            <div>
              <SelectFilmFields
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
            <label>Режисери</label>
            <div>
              <SelectFilmFields
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

          {/* {status === fetchStatus.Success && (
            <Notification severity="success" isOpen={true}>
              Актор створений
            </Notification>
          )}
          {status === fetchStatus.Error && (
            <Notification severity="error" isOpen={true}>
              {errorMessage}
            </Notification>
          )} */}
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
