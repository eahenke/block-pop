import { useEffect, useState, type ReactNode } from 'react';

import { PaletteContext } from './palette-context';
import { getCurrentPalette, savePalette } from '../../../storage/palette';

const defaultInitialPalette = 'classic';

// INIT
const savedPalette = getCurrentPalette();

type PaletteSetterProps = {
  palette: string;
  children: ReactNode;
};

export function PaletteSetter({ children, palette }: PaletteSetterProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      html.setAttribute('data-palette', palette);
    }
  }, [palette]);

  return <div>{children}</div>;
}

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState(savedPalette || defaultInitialPalette);

  const changePalette = (val: string) => {
    setPalette(val);
    savePalette(val);
  };

  const value = {
    palette,
    changePalette,
  };

  return (
    <PaletteContext.Provider value={value}>
      <PaletteSetter palette={palette}>{children}</PaletteSetter>
    </PaletteContext.Provider>
  );
};
