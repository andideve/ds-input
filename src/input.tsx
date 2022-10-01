import React, { forwardRef } from 'react';

import defaults from './input.defaults';
import Styled from './input.styled';
import { InputSizes, BaseInputProps } from './input.types';
import InputIcon from './input-icon';

function getIconSize(size: InputSizes) {
  return (
    {
      xs: '1rem',
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.25rem',
    } as Record<InputSizes, string>
  )[size];
}
function getIconSpacing(size: InputSizes) {
  return (
    {
      xs: '0.5rem',
      sm: '0.5rem',
      base: '0.75rem',
      lg: '0.75rem',
      xl: '0.75rem',
    } as Record<InputSizes, string>
  )[size];
}

export function createInput<T = HTMLInputElement, P = React.InputHTMLAttributes<HTMLInputElement>>(
  tag: keyof JSX.IntrinsicElements = 'input',
) {
  const Component = Styled.withComponent(tag);
  return forwardRef<T, P & BaseInputProps>(
    (
      {
        children,
        $size = defaults.$size,
        variant = defaults.variant,
        readOnly = defaults.readOnly,
        disabled = defaults.disabled,
        rounded = defaults.rounded,
        iconLeft = defaults.iconLeft,
        iconRight = defaults.iconRight,
        // ignore props
        _prefixWidth: __prefixWidth,
        _suffixWidth: __suffixWidth,
        ...rest
      },
      ref,
    ) => {
      const icon = { spacing: getIconSpacing($size), size: getIconSize($size) };
      return (
        <div style={{ position: 'relative', display: 'flex' }}>
          <Component
            ref={ref}
            $size={$size}
            variant={variant}
            readOnly={readOnly}
            disabled={disabled}
            rounded={rounded}
            _prefixWidth={iconLeft ? `calc(${icon.size} + ${icon.spacing})` : undefined}
            _suffixWidth={iconRight ? `calc(${icon.size} + ${icon.spacing})` : undefined}
            {...rest}
          />
          {iconLeft && (
            <InputIcon
              placement="start"
              spacing={icon.spacing}
              size={icon.size}
              style={{
                paddingLeft: 'var(--padding-x)', // come from `Styled`
              }}
            >
              {iconLeft}
            </InputIcon>
          )}
          {iconRight && (
            <InputIcon
              placement="end"
              spacing={icon.spacing}
              size={icon.size}
              style={{ paddingRight: 'var(--padding-x)' }}
            >
              {iconRight}
            </InputIcon>
          )}
        </div>
      );
    },
  );
}

export const Input = createInput();
Input.defaultProps = { type: 'text', spellCheck: 'false' };

export default Input;
