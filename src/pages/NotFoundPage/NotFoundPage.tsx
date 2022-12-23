import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPageStyled, DescriptionBlock } from './NotfoundPage.styled';

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <DescriptionBlock>
        <h3>Щось пішло не так</h3>
        <h4>Неправильно набрано адресу, або дана сторінка ще знаходиться на стадії розробки.</h4>
        <Link to="/">На головну</Link>
      </DescriptionBlock>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
