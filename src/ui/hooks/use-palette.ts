import { useContext } from 'react';
import { PaletteContext } from '../context/palette/palette-context';

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used inside of a <PaletteProvider />');
  }

  const { palette, changePalette } = context;

  return {
    palette,
    changePalette,
  };
};
