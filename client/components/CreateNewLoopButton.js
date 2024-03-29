import React, { Component } from 'react';
import { createNewLoopThunk, saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import LoopsInfoPopup from './LoopsInfoPopup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
const Tone = require('Tone');

class CreateNewLoopButton extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.newLoopButton = this.newLoopButton.bind(this);
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.createNewLoopThunk();
    Tone.Transport.cancel();
  }

  handleSave(event) {
    event.preventDefault();
    this.props.saveLoopThunk(this.props.sounds, this.props.loopId);
    this.handleCreate(event);
    toast('Loop Saved!', {
      position: 'bottom-right',
      autoClose: 2000
    });
  }

  newLoopButton() {
    // if the grid hasn't changed and the loop is already new (i.e. loopId is null) then disable the button
    if ((this.props.isSaved && !this.props.loopId) || !this.props.loopId) {
      return (
        <button className="button" type="submit" disabled>
          <img
            className="disabled-button-image"
            src="https://img.icons8.com/material-rounded/26/000000/plus-math--v1.png"
          />
        </button>
      );
    } else {
      return (
        <button className="button" type="submit">
          <img src="https://img.icons8.com/material-rounded/26/000000/plus-math--v1.png" />
        </button>
      );
    }
  }

  render() {
    return (
      <div className="icontext">
        <Popup trigger={this.newLoopButton()} modal>
          {close => (
            <div className="modal">
              <div className="content">
                Do you want to save the current loop before creating a new one?
              </div>
              <div className="actions">
                <button
                  className="button"
                  type="button"
                  onClick={event => {
                    this.handleSave(event);
                    close();
                  }}
                >
                  Yes
                </button>

                <button
                  className="button"
                  onClick={event => {
                    this.handleCreate(event);
                    close();
                  }}
                  type="submit"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </Popup>
        Create new
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sounds: state.sounds,
    loopId: state.loops.id,
    isSaved: state.loops.isSaved
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveLoopThunk: (newLoop, id) => dispatch(saveLoopThunk(newLoop, id)),
    createNewLoopThunk: () => dispatch(createNewLoopThunk())
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(
//   CreateNewLoopButton
// );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateNewLoopButton)
);
