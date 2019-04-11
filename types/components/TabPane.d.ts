import * as React from 'react';

import { BsPrefixComponent, TransitionCallbacks } from './helpers';

export interface TabPaneProps extends TransitionCallbacks {
  eventKey?: string;
  active?: boolean;
  transition?: false | React.ReactType;
  bsClass?: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

declare class TabPane<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, TabPaneProps> {}

export default TabPane;
