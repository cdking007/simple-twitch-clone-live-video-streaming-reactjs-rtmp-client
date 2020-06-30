import React, { Component } from "react";
import { fetchStream } from "../../actions/index";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import "./videoPlayer.css";
import flvjs from "flv.js";
import Axios from "axios";
class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  id = this.props.match.params.id;
  componentDidMount() {
    this.props.fetchStream(this.id);
    this.buildPlayer();
  }

  async componentDidUpdate() {
    console.log("getting");

    this.buildPlayer();
  }
  componentWillUnmount() {
    this.player.destroy();
  }
  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }

    this.videoRef.current.autoplay = true;
    this.player = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${this.id}.flv`,
    });
    console.log(this.videoRef.current);
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  render() {
    if (!this.props.stream) {
      return (
        <>
          <Spinner />
        </>
      );
    }
    return (
      <div>
        <div className="cstWrapper">
          <div className="video-container">
            <div className="c-video">
              <video
                className="video cstVideo"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                ref={this.videoRef}
              ></video>
              <div className="buttons">
                <p>Live</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ui">
          <h1>Title: {this.props.stream.title}</h1>
          <p>Description: {this.props.stream.description}</p>
        </div>
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
  fetchStream,
})(StreamShow);
