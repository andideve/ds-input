import React from 'react';
import { ResponsiveValue, CSSProperties } from '@andideve/styled-system';
import { Theme } from '@andideve/ds-core';

export interface SystemProps {
  rounded?: ResponsiveValue<CSSProperties['borderRadius']>;
}

interface ExtendOptions extends SystemProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  _prefixWidth?: string;
  _suffixWidth?: string;
}

export type InputSizes = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type InputVariants = 'filled' | 'flushed';
export interface InputOptions extends ExtendOptions {
  $size?: InputSizes;
  variant?: InputVariants;
  readOnly?: boolean;
  disabled?: boolean;
}
export interface BaseInputProps extends InputOptions {
  ref?: React.Ref<any>;
  as?: React.ElementType;
  theme?: Theme;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export type InputProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>;
