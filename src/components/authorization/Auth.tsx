import { styled, Typography } from '@mui/material';
import auth_img from '../../assets/img/auth_gest.png';

import AuthForm from './AuthForm';

const AuthFormWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '350px',
  margin: 'auto',
  textAlign: 'center',
});

const ImgWrapper = styled('div')({
  width: '200px',
  height: '200px',
  '& img': {
    objectFit: 'cover',
    width: '100%',
  },
});

const Auth: React.FC = () => {
  return (
    <AuthFormWrapper>
      <ImgWrapper>
        <img src={auth_img} alt="" />
      </ImgWrapper>

      <div>
        <Typography
          variant="h5"
          component="h3"
          // sx={{ fontSize: '24px', mb: 1.5, fontWeight: '700', color: '#3cb4e7' }}
        >
          Реєструйся в клубі Планети Кіно!
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          Квиток до дня народження, бонуси за покупки, персональні знижки
        </Typography>
      </div>
      <AuthForm />
    </AuthFormWrapper>
  );
};

export default Auth;
