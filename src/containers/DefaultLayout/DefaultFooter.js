import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/*<span><a href="https://r8way.moph.go.th">R8Way</a> &copy; r8way-2019</span>*/}
        <span className="ml-auto">Developed by <a href="https://r8way.moph.go.th" target="_blank">R8WAY</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
