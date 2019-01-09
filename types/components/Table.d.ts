import * as React from 'react';

declare namespace Table {
  interface TableProps extends React.HTMLProps<Table> {
    bordered?: boolean;
    condensed?: boolean;
    hover?: boolean;
    responsive?: boolean;
    striped?: boolean;
    fill?: boolean;
    bsPrefix?: string;
  }
}
declare class Table extends React.Component<Table.TableProps> {}
export = Table;
