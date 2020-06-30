import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions/index";
import { Link } from "react-router-dom";
class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = (stream) => {
    if (stream.userId === this.props.auth.userId) {
      return (
        <div className="right floated content">
          <Link
            className="ui button primary"
            data-tooltip="to edit the stream"
            data-position="bottom left"
            to={`/streams/edit/${stream.id}`}
          >
            Edit
          </Link>
          <Link
            className="ui button negative"
            data-tooltip="to delete the stream"
            data-position="bottom left"
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };
  renderCreate = () => {
    if (this.props.auth.isSignedIn) {
      return (
        <Link
          to="/streams/new"
          className="ui button primary"
          data-tooltip="to create new stream"
          data-position="bottom left"
        >
          Create New Stream
        </Link>
      );
    }
  };
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div style={{ textAlign: "right" }}>{this.renderCreate()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
})(StreamList);
