import { useContext, useEffect, useState } from 'react';
import { PaletteContext } from '../context/palette/palette-context';
import {
  saveCustomPalette as storageSaveCustomPalette,
  getCustomPalettes as storageGetCustomPalettes,
  deleteCustomPalette,
  updateCustomPalette,
  CUSTOM_PALETTES_KEY,
} from '../../storage/palette';
import type { PaletteType } from '../../palette/types';

export type PaletteUiInterface = {
  palette: PaletteType;
  customPalettes: PaletteType[];
  changePalette: (palette: PaletteType) => void;
  saveCustomPalette: (palette: PaletteType) => void;
  deletePalette: (palette: PaletteType) => void;
  updatePalette: (name: string, palette: PaletteType) => void;
};

export const usePalette = (): PaletteUiInterface => {
  const context = useContext(PaletteContext);
  const [customPalettes, setCustomPalettes] = useState(
    Object.values(storageGetCustomPalettes() || {})
  );

  useEffect(() => {
    const handleLocalStorageChange = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        event.key === CUSTOM_PALETTES_KEY
      ) {
        setCustomPalettes(Object.values(storageGetCustomPalettes() || {}));
      }
    };

    window.addEventListener('storage', handleLocalStorageChange, false);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange, false);
    };
  }, []);

  if (!context) {
    throw new Error('usePalette must be used inside of a <PaletteProvider />');
  }

  const { palette, changePalette } = context;

  const saveCustomPalette = (palette: PaletteType) => {
    storageSaveCustomPalette(palette);
  };

  const deletePalette = (palette: PaletteType) => {
    deleteCustomPalette(palette.name);
  };

  const updatePalette = (name: string, palette: PaletteType) => {
    updateCustomPalette(name, palette);
  };

  return {
    palette,
    changePalette,
    customPalettes,
    saveCustomPalette,
    updatePalette,
    deletePalette,
  };
};
