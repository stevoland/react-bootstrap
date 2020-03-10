import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import all from 'prop-types-extra/lib/all';
import Feedback from './Feedback';
import FormFileInput from './FormFileInput';
import FormFileLabel from './FormFileLabel';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-file'
   */
  bsPrefix: PropTypes.string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file'
   */
  bsCustomPrefix: PropTypes.string,

  /**
   * The FormFile `ref` will be forwarded to the underlying input element,
   * which means it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * The underlying HTML element to use when rendering the FormFile.
   *
   * @type {('input'|elementType)}
   */
  as: PropTypes.elementType,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string,

  /**
   * Provide a function child to manually handle the layout of the FormFile's inner components.
   *
   * ```jsx
   * <FormFile>
   *   <FormFile.Input isInvalid />
   *   <FormFile.Label>Allow us to contact you?</FormFile.Label>
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormFile>
   * ```
   */
  children: PropTypes.node,

  disabled: PropTypes.bool,
  label: PropTypes.node,

  /** Use Bootstrap's custom form elements to replace the browser defaults */
  custom: PropTypes.bool,

  /** Manually style the input as valid */
  isValid: PropTypes.bool.isRequired,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool.isRequired,

  /** A message to display when the input is in a validation state */
  feedback: PropTypes.node,

  /** The string for the button when using custom file input */
  buttonText: all(PropTypes.string, ({ custom, buttonText }) =>
    buttonText && !custom
      ? Error('`buttonText` can only be set when custom is `true`')
      : null,
  ),
};

const defaultProps = {
  disabled: false,
  isValid: false,
  isInvalid: false,
};

const FormFile = React.forwardRef(
  (
    {
      id,
      bsPrefix,
      bsCustomPrefix,
      disabled,
      isValid,
      isInvalid,
      feedback,
      className,
      style,
      label,
      children,
      custom,
      buttonText,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as = 'input',
      ...props
    },
    ref,
  ) => {
    bsPrefix = custom
      ? useBootstrapPrefix(bsCustomPrefix, 'custom')
      : useBootstrapPrefix(bsPrefix, 'form-group');

    const type = 'file';
    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
        custom,
      }),
      [controlId, custom, id],
    );

    const hasLabel = label != null && label !== false && !children;

    const input = (
      <FormFileInput
        {...props}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
        disabled={disabled}
        as={as}
      />
    );

    return (
      <FormContext.Provider value={innerFormContext}>
        <div
          style={style}
          className={classNames(
            className,
            bsPrefix,
            custom && `custom-${type}`,
          )}
        >
          {children || (
            <>
              {custom ? (
                <>
                  {input}
                  {hasLabel && (
                    <FormFileLabel buttontext={buttonText}>
                      {label}
                    </FormFileLabel>
                  )}
                </>
              ) : (
                <>
                  {hasLabel && <FormFileLabel>{label}</FormFileLabel>}
                  {input}
                </>
              )}
              {(isValid || isInvalid) && (
                <Feedback type={isValid ? 'valid' : 'invalid'}>
                  {feedback}
                </Feedback>
              )}
            </>
          )}
        </div>
      </FormContext.Provider>
    );
  },
);

FormFile.displayName = 'FormFile';
FormFile.propTypes = propTypes;
FormFile.defaultProps = defaultProps;

FormFile.Input = FormFileInput;
FormFile.Label = FormFileLabel;

export default FormFile;
