import { useFormik } from 'formik';
import React from 'react';

const Movies = () => {
  const initialValues = {
    name: '',
    description: '',
    genres: [],
    actors: [],
    directors: [],
    rating: '',
    imdb_rating: '',
    poster_src: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {},
  });

  return <div>Movies</div>;
};

export default Movies;
