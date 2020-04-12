import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "895827237631-9rh8vup2a9uflb54fmd0veef3e3qetjc.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // console.log(this);
          this.auth = window.gapi.auth2.getAuthInstance();
          // console.log(this.auth.isSignedIn);
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <i className="spinner loading icon"></i>;
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button onClick={this.onSignOutClick} className="ui red button">
            <i className="icon google" />
            Sign out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.onSignInClick} className="ui red button">
            <i className="icon google" />
            Sign in
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
