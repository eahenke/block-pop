import type { PaletteType } from '../palette/types';
import { isPresetPalette } from '../palette/utils';

export const CURRENT_PALETTE_KEY = 'currentPalette';

export const getCurrentPalette = (): PaletteType | null => {
  const paletteRaw = localStorage.getItem(CURRENT_PALETTE_KEY);
  if (!paletteRaw) return null;

  try {
    return JSON.parse(paletteRaw);
  } catch (e) {
    // Backwards compat in case a string value is already stored
    if (e instanceof Error) {
      console.error('Error getting palette:', e.message);
      return null;
    }
    throw e;
  }
};

export const saveCurrentPalette = (val: PaletteType) => {
  localStorage.setItem(CURRENT_PALETTE_KEY, JSON.stringify(val));
};

type CustomPalettes = Record<string, PaletteType>;

export const CUSTOM_PALETTES_KEY = 'customPalettes';

const fireEvent = () => {
  const event = new StorageEvent('storage', {
    key: CUSTOM_PALETTES_KEY,
    url: window.location.href,
    storageArea: localStorage,
  });

  window.dispatchEvent(event);
};

export const getCustomPalettes = (): CustomPalettes | null => {
  try {
    const palettesRaw = localStorage.getItem(CUSTOM_PALETTES_KEY);
    if (!palettesRaw) return null;

    const customPalettes: CustomPalettes = JSON.parse(palettesRaw);

    return customPalettes || null;
  } catch (e) {
    console.error('Error getting CustomPalettes', e);
    return null;
  }
};

export const saveCustomPalette = (palette: PaletteType): void => {
  const customPalettes = getCustomPalettes() || {};

  if (isPresetPalette(palette.name) || customPalettes[palette.name]) {
    throw new Error(`Palette name "${palette.name}" is already in use`);
  }

  localStorage.setItem(
    CUSTOM_PALETTES_KEY,
    JSON.stringify({
      ...customPalettes,
      [palette.name]: palette,
    })
  );
  fireEvent();
};

export const updateCustomPalette = (
  name: string,
  palette: PaletteType
): void => {
  if (isPresetPalette(name)) {
    throw new Error(`Preset palette "${palette.name}" cannot be updated`);
  }

  const customPalettes = getCustomPalettes() || {};

  const newCustomPalettes = {
    ...customPalettes,
  };
  delete newCustomPalettes[name];

  if (isPresetPalette(palette.name) || newCustomPalettes[palette.name]) {
    throw new Error(`Palette name "${palette.name}" is already in use`);
  }

  localStorage.setItem(
    CUSTOM_PALETTES_KEY,
    JSON.stringify({
      ...newCustomPalettes,
      [palette.name]: palette,
    })
  );
  fireEvent();
};

export const deleteCustomPalette = (paletteName: string) => {
  const customPalettes = getCustomPalettes();
  if (!customPalettes) return;

  const newCustomPalettes = {
    ...customPalettes,
  };

  delete newCustomPalettes[paletteName];

  localStorage.setItem(CUSTOM_PALETTES_KEY, JSON.stringify(newCustomPalettes));
  fireEvent();
};
