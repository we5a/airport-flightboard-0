import React from 'react';
import { Modal } from '@material-ui/core';
import styles from './MainModal.module.css';

type MainModalProps = {
  isOpen: boolean,
  handleClose: () => void,
  children: JSX.Element
}

const MainModal = ({ isOpen, handleClose, children }: MainModalProps): JSX.Element => {

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={handleClose}
        disableBackdropClick
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }
        }}
      >
        <div className={styles.contentContainer}>
          {children}

        </div>
      </Modal>
    </React.Fragment>
  )
}

export default MainModal;
