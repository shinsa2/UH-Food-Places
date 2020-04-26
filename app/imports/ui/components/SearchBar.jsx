import _ from 'lodash';
import React from 'react';
import { Search, Grid, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Vendors } from '/imports/api/vendor/vendor';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

const resultRenderer = ({ vendorName }) => <Label content={vendorName}/>

resultRenderer.propTypes = {
  vendorName: PropTypes.string,
};

class SearchBar extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '', _id: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.vendorName, _id: result._id });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.vendorName);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.vendors, isMatch),
      });
    }, 300);
  }

  /** Render the search bar. Use Search: https://react.semantic-ui.com/modules/search/ */
  render() {
    const { isLoading, value, results, _id } = this.state;
    return (
        <Grid>
          <Grid.Column width={8}>
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                {...this.props}
            />
            {
              this.state.value.length > 0 ? (
                  <Link to={`/moreinfo/${this.state._id}`}><Button content='Check it out!'/></Link>
              ) : (
                  <Button disabled>Check it out!</Button>
              )
            }
          </Grid.Column>
        </Grid>
    );
  }
}

SearchBar.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendor');
  return {
    vendors: Vendors.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchBar);
