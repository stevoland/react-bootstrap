import * as React from 'react';

declare namespace Radio {
  interface RadioProps extends React.HTMLProps<Radio> {
    bsPrefix?: string;
    disabled?: boolean;
    inline?: boolean;
    inputRef?: (instance: HTMLInputElement) => void;
    validationState?: 'success' | 'warning' | 'error';
  }
}
declare class Radio extends React.Component<Radio.RadioProps> {}
export = Radio;
