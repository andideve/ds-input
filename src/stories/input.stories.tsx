import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from '../input';
import defaults from '../input.defaults';
import { CloudDownload } from './icons';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  variant: defaults.variant,
  $size: defaults.$size,
  readOnly: defaults.readOnly,
  disabled: defaults.disabled,
  rounded: defaults.rounded,
  placeholder: 'Search...',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: defaults.variant,
  $size: defaults.$size,
  readOnly: defaults.readOnly,
  disabled: defaults.disabled,
  rounded: defaults.rounded,
  placeholder: 'Search...',
  iconLeft: <CloudDownload />,
  iconRight: <CloudDownload />,
};
