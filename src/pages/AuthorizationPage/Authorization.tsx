import Auth from '../../components/authorization/Auth';
import { styled } from '@mui/material';

const DivWrapper = styled('div')({
  maxWidth: '1200px',
  margin: 'auto',
});

const Authorization = () => {
  return (
    <DivWrapper className="authorization">
      <Auth />
    </DivWrapper>
  );
};

export default Authorization;
