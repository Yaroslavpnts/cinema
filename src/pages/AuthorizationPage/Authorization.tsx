import Auth from '../../components/authorization/Auth';
import { styled } from '@mui/material';
import { Container } from '@mui/material';

const Authorization: React.FC = () => {
  return (
    <div>
      <Container>
        <Auth />
      </Container>
    </div>
  );
};

export default Authorization;
