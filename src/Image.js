import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Sets image as fluid image.
   */
  fluid: PropTypes.bool,

  /**
   * Sets image shape as rounded.
   */
  rounded: PropTypes.bool,

  /**
   * Sets image shape as circle.
   */
  roundedCircle: PropTypes.bool,

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: PropTypes.bool
};

const defaultProps = {
  fluid: false,
  rounded: false,
  roundedCircle: false,
  thumbnail: false
};

class Image extends React.Component {
  render() {
    const {
      fluid,
      rounded,
      roundedCircle,
      thumbnail,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      [prefix(bsProps, 'fluid')]: fluid,
      rounded,
      'rounded-circle': roundedCircle,
      [prefix(bsProps, 'thumbnail')]: thumbnail
    };

    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default bsClass('img', Image);
