import React from 'react';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './MainModal.module.css';

const MainModal = ({ isOpen, handleClose, children }) => {

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

MainModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.element
}

export default MainModal;
