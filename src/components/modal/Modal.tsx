import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  padding: '10rem',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};

interface ModalProps {
  open: boolean;
  handleClose: (e: React.MouseEvent<HTMLElement>, type: 'escapeKeyDown' | 'backdropClick') => void;
  children: React.ReactNode;
  modalTitle: string;
}

const CreateModal: React.FC<ModalProps> = ({ open, handleClose, modalTitle, children }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={(e: any, reason) => handleClose(e, reason)}
        closeAfterTransition
        // hideBackdrop
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h3">
              {modalTitle}
            </Typography>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateModal;
