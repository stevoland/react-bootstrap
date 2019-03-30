import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import AccordionContext from './AccordionContext';

const propTypes = {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,

  children: PropTypes.element.isRequired,
};

const AccordionCollapse = React.forwardRef((
  { children, eventKey, ...props } /* ref */,
) => {
  const context = useContext(AccordionContext);

  return (
    <Collapse
      /* ref={ref} */ in={context.activeEventKey === eventKey}
      {...props}
    >
      {React.Children.only(children)}
    </Collapse>
  );
});

AccordionCollapse.propTypes = propTypes;

export default AccordionCollapse;
