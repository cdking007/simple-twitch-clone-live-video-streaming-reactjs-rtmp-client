import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
  state = {};
  renderErrorMessage = (meta) => {
    if (meta.error && meta.touched) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    const cList = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={cList}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderErrorMessage(meta)}</div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <div>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button
            className="ui button primary"
            data-tooltip="Click to create stream"
            data-position="bottom left"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must Enter the value of the title";
  }
  if (!formValues.description) {
    errors.description = "You must Enter the value of the description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamCreate);
