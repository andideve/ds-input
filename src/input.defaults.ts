import { InputOptions } from './input.types';

const defaults: Required<InputOptions> = {
  $size: 'base',
  variant: 'filled',
  readOnly: false,
  disabled: false,
  rounded: '0.375rem',
  iconLeft: null,
  iconRight: null,
  _prefixWidth: '0px',
  _suffixWidth: '0px',
};

export default defaults;
