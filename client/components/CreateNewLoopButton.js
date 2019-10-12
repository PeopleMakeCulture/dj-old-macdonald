import React, { Component } from 'react';
import { createNewLoopThunk, saveLoopThunk } from '../store/reducers/loops';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Tone = require('Tone');

class CreateNewLoopButton extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSave = this.handleSave.bind(this);
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
  render() {
    return (
      <div className="icontext">
        <Popup
          trigger={
            <button className="button" type="submit">
              <img src="https://img.icons8.com/material-rounded/26/000000/plus-math--v1.png" />
            </button>
          }
          modal
        >
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
    loopId: state.loops.id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveLoopThunk: (newLoop, id) => dispatch(saveLoopThunk(newLoop, id)),
    createNewLoopThunk: () => dispatch(createNewLoopThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateNewLoopButton
);
