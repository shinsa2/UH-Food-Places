import React from 'react';
import { Vendors, VendorSchema } from '/imports/api/vendor/vendor';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddVendorAdmin extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
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
    const { vendorName, shortDescription, fullDescription, image, locationImage, hours, location, menu, rating } = data;
    const owner = Meteor.user().username;
    Vendors.insert({ vendorName, shortDescription, fullDescription, image, locationImage,
          hours, location, menu, rating, owner },
        this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const divStyle = { paddingBottom: '25px' };
    return (
        <Container style={divStyle}>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Vendor</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={VendorSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='vendorName'/>
                <LongTextField name='shortDescription'/>
                <LongTextField name='fullDescription'/>
                <TextField name='image'/>
                <TextField name='hours'/>
                <TextField name='location'/>
                <TextField name='locationImage'/>
                <TextField name='menu'/>
                <TextField name='rating'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </Container>
    );
  }
}

export default AddVendorAdmin;
