import React from 'react';
import { useModalsStack } from '@mantine/core';
import type { SettingsSections } from './constants';

export type SettingsMenuContext = {
  open: (id: SettingsSections) => void;
  currentOpen: SettingsSections | null;
  toMainSettings: () => void;
  handleBack: () => void;
} & ReturnType<typeof useModalsStack<SettingsSections>>;

export const SettingsMenuContext =
  React.createContext<SettingsMenuContext | null>(null);
