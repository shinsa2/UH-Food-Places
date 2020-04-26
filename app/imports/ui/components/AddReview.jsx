import React from 'react';
import { Reviews, ReviewSchema } from '/imports/api/review/review';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SelectField from 'uniforms-semantic/SelectField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddReview extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { review, rating, createdAt, vendorName } = data;
    const owner = Meteor.user().username;
    Reviews.insert({ vendorName, review, owner, rating, createdAt }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ ReviewSchema } onSubmit={this.submit}>
          <Segment>
            <TextField name='review'/>
            <SelectField name='rating'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='createdAt' value={ new Date().toLocaleString() }/>
            <HiddenField name='vendorName' value={this.props.vendor.vendorName}/>
            <HiddenField name='owner' value='fakeuser@foo.com'/>
          </Segment>
        </AutoForm>
    );
  }
}

AddReview.propTypes = {
  vendor: PropTypes.object.isRequired,
};

export default AddReview;
