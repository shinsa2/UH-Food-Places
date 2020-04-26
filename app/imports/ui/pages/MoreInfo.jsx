import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Image, Loader, Header, Divider, Grid, List, Comment } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import { Reviews } from '/imports/api/review/review';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AddReview from '../components/AddReview';
import Review from '../components/Review';

/** Renders a table containing all of the Vendor documents. Use to render each row. */
class MoreInfo extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const vendorReview = this.props.reviews.filter(review => review.vendorName === this.props.vendor.vendorName);
    return (
        <Container>
          <Image src={this.props.vendor.image} centered/>
          <Divider/>
          <Grid padded columns={3 + this.props.vendor.locationImage.length}>
            {this.props.vendor.locationImage.map((image, index) => <Grid.Column><Image centered src={image}
                                                                                       key={index}/></Grid.Column>)}
            <Grid.Column>
              <Container text>
                <Header as='h4' textAlign='center'>{this.props.vendor.location}</Header>
                {this.props.vendor.fullDescription}
              </Container>
            </Grid.Column>
          </Grid>
          <Divider/>
          <Grid padded centered>
            <List>
              <List.Item><Header as='h4'>Menu</Header></List.Item>
              {this.props.vendor.menu.map((item) => <List.Item>{item}</List.Item>)}
            </List>
          </Grid>
          <Divider/>
          <Grid padded centered>
            <List>
              <List.Item><Header as='h4'>Operating Hours:</Header></List.Item>
              {this.props.vendor.hours}
            </List>
          </Grid>
          <Divider/>
          <h3>Add review</h3>
          <AddReview vendor={this.props.vendor}/>
          <Divider/>
          <h3>All reviews</h3>
          <Divider/>
          <Grid>
            <Comment.Group>
              {
                vendorReview.map((review, index) => <Review key={index}
                                                            review={review}/>)
              }
            </Comment.Group>
          </Grid>
          <br/>
        </Container>
    );
  }
}

/** Require the presence of a Vendor document in the props object. Uniforms adds 'model' to the props, which we use. */
MoreInfo.propTypes = {
  vendor: PropTypes.object,
  model: PropTypes.object,
  reviews: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe('Vendors');
  const subscription2 = Meteor.subscribe('Reviews');
  return {
    vendor: Vendors.findOne(documentId),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(MoreInfo);
