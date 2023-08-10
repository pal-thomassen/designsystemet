import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Chip } from '..';

import { Group } from './';

const meta: Meta<typeof Group> = {
  title: 'Kjernekomponenter/Chip/Group',
  component: Group,
};

export default meta;

type Story = StoryFn<typeof Group>;

export const Preview: Story = (args) => (
  <Chip.Group {...args}>
    <Chip.Toggle>Nynorsk</Chip.Toggle>
    <Chip.Toggle>Bokmål</Chip.Toggle>
  </Chip.Group>
);

Preview.args = {
  size: 'small',
};