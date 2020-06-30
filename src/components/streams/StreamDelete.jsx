import React, { Component } from "react";
import Modal from "../Modal/Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions/index";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Error404 from "../404/Error404";

class StreamDelete extends Component {
  state = {};
  id = this.props.match.params.id;
  componentDidMount() {
    this.props.fetchStream(this.id);
  }
  handleDeleteStream = () => {
    this.props.deleteStream(this.id);
  };
  renderActions = () => {
    return (
      <>
        <button
          onClick={this.handleDeleteStream}
          className="ui button negative"
        >
          Delete
        </button>
        <button onClick={this.onDismiss} className="ui button">
          Cancel
        </button>
      </>
    );
  };
  onDismiss = () => {
    return history.push("/");
  };
  render() {
    if (!this.props.stream) {
      return (
        <>
          <Spinner />
        </>
      );
    }

    if (this.props.auth.userId !== this.props.stream.userId) {
      return (
        <>
          <Error404 />
        </>
      );
    }
    return (
      <div>
        Helo world from stream Delete
        <Modal
          title="Delete a stream"
          actions={this.renderActions()}
          onDismiss={this.onDismiss}
        >
          <h1>Are You sure you want to delete the stream?</h1>
          <p>
            <b>Title: </b>
            {this.props.stream.title}
          </p>
          <p>
            <b>Description: </b>
            {this.props.stream.description}
          </p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  deleteStream,
  fetchStream,
})(StreamDelete);
