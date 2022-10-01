import styled, { CSSObject, FunctionInterpolation } from '@emotion/styled';
import { system, runIfFn, ThemeKey } from '@andideve/styled-system';
import { createMediaQuery } from '@andideve/sx-core';

import defaults from './input.defaults';
import { SystemProps, InputSizes, InputVariants, InputProps } from './input.types';

function size(sizes: Record<InputSizes, CSSObject>) {
  return ({ $size = defaults.$size }: InputProps = {}) => sizes[$size];
}

function variant(variants: Record<InputVariants, CSSObject>) {
  return ({ variant = defaults.variant }: InputProps = {}) => variants[variant];
}

type States = 'readOnly' | 'disabled' | 'hover' | 'active' | 'focus' | 'lg:active';
type GetCSSFn<P = any> = (props: P) => CSSObject;
type StatesConfig<P = any> = { [key in States]?: CSSObject | GetCSSFn<P> };

function createStates<P = any>(config: StatesConfig<P>, props?: P): CSSObject {
  const states: { [key in States]?: CSSObject } = {};
  for (const _ in config) {
    const key = _ as keyof typeof config;
    states[key] = runIfFn(config[key], props);
  }

  return {
    '&[readonly]': states.readOnly,
    '&[disabled]': states.disabled,
    '&:not([readonly]):not([disabled]):active': states.active,
    '&:not([readonly]):not([disabled]):focus': states.focus,
    [createMediaQuery(1024)]: {
      '&:not([readonly]):not([disabled]):not(:active):hover': states.hover,
      '&:not([readonly]):not([disabled]):active': states['lg:active'],
    },
  };
}

function state<P = any>(config: StatesConfig<P>) {
  return (props: P) => createStates<P>(config, props);
}

const styles: (CSSObject | FunctionInterpolation<InputProps>)[] = [
  ({ _prefixWidth = defaults._prefixWidth, _suffixWidth = defaults._suffixWidth }) => ({
    '--prefix-width': _prefixWidth,
    '--suffix-width': _suffixWidth,
  }),
  {
    outline: 'none',
  },
  {
    width: '100%',
    paddingTop: 'var(--padding-y, 0px)',
    paddingBottom: 'var(--padding-y, 0px)',
    paddingLeft: 'calc(var(--padding-x) + var(--prefix-width))',
    paddingRight: 'calc(var(--padding-x) + var(--suffix-width))',
  },
  size({
    xs: {
      fontSize: 'var(--ds-fontSizes-xs)',
      lineHeight: 'var(--ds-lineHeights-normal)',
      '&[rows]': { '--padding-y': '0.5rem' },
      '&:not([rows])': { height: '2.125rem' },
      '&, & ~ *': { '--padding-x': '0.75rem' },
    },
    sm: {
      fontSize: 'var(--ds-fontSizes-sm)',
      lineHeight: 'var(--ds-lineHeights-5)',
      '&[rows]': { '--padding-y': '0.5rem' },
      '&:not([rows])': { height: '2.25rem' },
      '&, & ~ *': { '--padding-x': '0.75rem' },
    },
    base: {
      fontSize: 'var(--ds-fontSizes-sm)',
      lineHeight: 'var(--ds-lineHeights-5)',
      '&[rows]': { '--padding-y': '0.625rem' },
      '&:not([rows])': { height: '2.5rem' },
      '&, & ~ *': { '--padding-x': '1.25rem' },
    },
    lg: {
      fontSize: 'var(--ds-fontSizes-base)',
      lineHeight: 'var(--ds-lineHeights-6)',
      '&[rows]': { '--padding-y': '0.75rem' },
      '&:not([rows])': { height: '3rem' },
      '&, & ~ *': { '--padding-x': '1.25rem' },
    },
    xl: {
      fontSize: 'var(--ds-fontSizes-base)',
      lineHeight: 'var(--ds-lineHeights-6)',
      '&[rows]': { '--padding-y': '0.875rem' },
      '&:not([rows])': { height: '3.25rem' },
      '&, & ~ *': { '--padding-x': '1.5rem' },
    },
  }),
  variant({
    filled: {
      color: 'var(--ds-colors-foreground-primary)',
      backgroundColor: 'var(--ds-colors-fill-tertiary)',
      '&::placeholder': {
        color: 'var(--ds-colors-foreground-secondary)',
      },
    },
    flushed: {
      paddingRight: 1,
      paddingLeft: 1,
      color: 'var(--ds-colors-foreground-primary)',
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 -1px 0 0 var(--ds-colors-separator-transparent)',
      '&::placeholder': {
        color: 'var(--ds-colors-foreground-secondary)',
      },
    },
  }),
  state({
    readOnly: { opacity: 0.64 },
    disabled: { opacity: 0.24 },
    focus({ variant = defaults.variant }) {
      return (
        {
          filled: {
            boxShadow: 'inset 0 0 0 1px var(--ds-colors-accent)',
          },
          flushed: {
            boxShadow: 'inset 0 -1px 0 0 var(--ds-colors-accent)',
          },
        } as Record<InputVariants, CSSObject>
      )[variant];
    },
  }),
  system<SystemProps>({
    rounded: {
      property: 'borderRadius',
      scale: ThemeKey.radii,
    },
  }),
];

export const Styled = styled.input(...styles);

export default Styled;
