import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRootStates, initializeDialog, closeDialog } from './dialogs';

const withReduxDialog = name => Dialog => {
  class ReduxDialog extends Component {
    componentDidMount() {
      this.props.initializeDialog(name);
    }
    render() {
      const { initializeDialog, handleClose, ...other } = this.props;
      return (
        <Dialog
          handleClose={() => {
            closeDialog(name);
          }}
          {...other}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => ({
    ...getRootStates(state, props, name)
  });

  return connect(
    mapStateToProps,
    {
      initializeDialog,
      closeDialog
    }
  )(ReduxDialog);
};

export default withReduxDialog;
