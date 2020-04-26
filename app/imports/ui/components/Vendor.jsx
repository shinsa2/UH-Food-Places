import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Vendors } from '/imports/api/vendor/vendor';

/** Renders a single row in the List Vendors table. See pages/ListVendors.jsx. */
class Vendor extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const result = window.confirm('Do you really want to delete?');
    if (result) {
      Vendors.remove(this.props.vendor._id, this.deleteCallback);
    }
    return false;
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  render() {
    return (
        <Card centered>
          <Link to={`/moreinfo/${this.props.vendor._id}`}>
            <Image centered src={this.props.vendor.image}></Image>
          </Link>
          <Card.Content>
            <Card.Header>
              <Link to={`/moreinfo/${this.props.vendor._id}`}>{this.props.vendor.vendorName}
              </Link>
            </Card.Header>
            <Card.Meta>{this.props.vendor.location}</Card.Meta>
            <Card.Description>{this.props.vendor.shortDescription}</Card.Description>
            <Card.Description>{this.props.vendor.rating}</Card.Description>
            <Card.Description>
              <em>
                <Link to={`/moreinfo/${this.props.vendor._id}`}>[more]</Link>
              </em>
            </Card.Description>
          </Card.Content>
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Card.Content extra activeClassName="active" exact to="/admin" key='admin'>
                <Button basic color='green'>
                  <Link to={`/edit/${this.props.vendor._id}`}>Edit</Link>
                </Button>
                <Button basic onClick={this.onClick} color='red'>Delete
                </Button>
              </Card.Content>
          ) : ''}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Vendor.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Vendor);
