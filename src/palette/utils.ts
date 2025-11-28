import { PRESET_PALETTES } from './contants';

export const isPresetPalette = (name: string) => {
  return !!PRESET_PALETTES.find(p => p.name === name);
};
