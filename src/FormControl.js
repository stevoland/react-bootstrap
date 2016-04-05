import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';

import FormControlFeedback from './FormControlFeedback';
import FormControlStatic from './FormControlStatic';

const propTypes = {
  componentClass: elementType,
  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: React.PropTypes.string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: React.PropTypes.string,
};

const defaultProps = {
  componentClass: 'input',
};

const contextTypes = {
  $bs_formGroup: React.PropTypes.object,
};

class FormControl extends React.Component {
  getControlId(formGroup) {
    return formGroup && formGroup.controlId;
  }

  render() {
    const {
      componentClass: Component,
      type,
      id = this.getControlId(this.context.$bs_formGroup),
      className,
      ...props,
    } = this.props;

    delete props.bsClass;

    // input[type="file"] should not have .form-control.
    let classes;
    if (type !== 'file') {
      classes = bootstrapUtils.getClassSet(this.props);
    }

    return (
      <Component
        {...props}
        type={type}
        id={id}
        className={classNames(className, classes)}
      />
    );
  }
}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

FormControl.Feedback = FormControlFeedback;
FormControl.Static = FormControlStatic;

export default bsClass('form-control', FormControl);
