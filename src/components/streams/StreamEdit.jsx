import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions/index";
import Spinner from "../Spinner/Spinner";
import StreamForm from "./StreamForm";
import Error404 from "../404/Error404";
class StreamEdit extends Component {
  state = {};
  id = this.props.match.params.id;
  componentDidMount() {
    this.props.fetchStream(this.id);
  }

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.editStream(this.id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    // console.log(this.props.stream);
    // console.log(this.props.auth);
    // console.log(this.props.stream.userId === this.props.auth.userId);
    if (!this.props.auth.isSignedIn) {
      return (
        <div>
          <Error404 />
        </div>
      );
    }
    if (this.props.stream.userId !== this.props.auth.userId) {
      return (
        <div>
          <Error404 />
        </div>
      );
    }
    return (
      <div>
        <h1>Edit a Stream</h1>
        <StreamForm
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description,
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchStream,
  editStream,
})(StreamEdit);
