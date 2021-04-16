import React from 'react';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contentContainer: {
    position: 'absolute',
    top: 'calc(40% - 70px)',
    left: 'calc(50% - 280px)',
    width: '550px',
    minHeight: '150px',
    backgroundColor: 'white',
    border: '1px solid green',
    outline: 'none',
    padding: '20px',
    fontWeight: 400,
    color: 'black',
    borderRadius: '15px'
  }
});

const MainModal = ({ isOpen, handleClose, children }) => {
  const classes = useStyles();

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
        <div className={classes.contentContainer}>
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
