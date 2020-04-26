import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
        <Comment>
          <Comment.Content>
            <Comment.Author as='a'>{this.props.review.owner}</Comment.Author>
            <Comment.Metadata>
              <div>{this.props.review.createdAt}</div>
              <div>{this.props.review.rating}</div>
            </Comment.Metadata>
            <Comment.Text>{this.props.review.review}</Comment.Text>
          </Comment.Content>
        </Comment>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
