import type { ValueOf } from '../../utils/types';

export const SETTINGS_SECTIONS = {
  SETTINGS: 'settings',
  NEW: 'new',
  ENTER: 'enter',
  HISTORY: 'history',
  STATS: 'stats',
  PALETTE: 'palette',
  PALETTE_CUSTOM: 'paletteCustom',
} as const;

export type SettingsSections = ValueOf<typeof SETTINGS_SECTIONS>;
