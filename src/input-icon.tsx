import React from 'react';
import styled, { CSSObject, FunctionInterpolation } from '@emotion/styled';

interface InputIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size: string | number;
  placement?: 'start' | 'end';
  spacing?: string | number;
}

const styles: (CSSObject | FunctionInterpolation<InputIconProps>)[] = [
  {
    lineHeight: 0,
    svg: {
      color: 'currentcolor',
      width: 'inherit',
      height: 'inherit',
    },
  },
  ({ placement, spacing }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    [placement === 'start' ? 'left' : 'right']: 0,
    display: 'flex',
    alignItems: 'center',
    [placement === 'start' ? 'paddingRight' : 'paddingLeft']: spacing,
  }),
  ({ size }) => ({
    svg: {
      width: size,
      height: size,
    },
  }),
];

const InputIcon = styled.span(...styles);

export default InputIcon;
