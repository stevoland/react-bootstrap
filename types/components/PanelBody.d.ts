import * as React from 'react';
import { SelectCallback } from 'react-bootstrap';

declare namespace PanelBody {
  export interface PanelBodyProps extends React.HTMLProps<PanelBody> {
    collapsible?: boolean;
    bsPrefix?: string;
  }
}
declare class PanelBody extends React.Component<PanelBody.PanelBodyProps> {}
export = PanelBody;
