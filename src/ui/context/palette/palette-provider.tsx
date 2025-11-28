import React, { useState, type ReactNode } from 'react';

import { PaletteContext } from './palette-context';
import {
  getCurrentPalette,
  saveCurrentPalette,
} from '../../../storage/palette';
import type { PaletteType } from '../../../palette/types';
import { PRESET_PALETTES } from '../../../palette/contants';

// INIT
const savedPalette = getCurrentPalette() || PRESET_PALETTES[0];

const toCssVars = (palette: PaletteType | null): React.CSSProperties => {
  if (!palette) return {};
  return {
    '--block-color-1': palette.block1 || '',
    '--block-color-2': palette.block2 || '',
    '--block-color-3': palette.block3 || '',
    '--block-color-4': palette.block4 || '',
    '--block-color-5': palette.block5 || '',
  } as React.CSSProperties;
};

type PaletteSetterProps = {
  palette: PaletteType;
  children: ReactNode;
};

export function PaletteWrapper({ children, palette }: PaletteSetterProps) {
  return <div style={toCssVars(palette)}>{children}</div>;
}

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState<PaletteType>(savedPalette);

  const changePalette = (val: PaletteType) => {
    setPalette(val);
    saveCurrentPalette(val);
  };

  const value = {
    palette,
    changePalette,
  };

  return (
    <PaletteContext.Provider value={value}>
      <PaletteWrapper palette={palette}>{children}</PaletteWrapper>
    </PaletteContext.Provider>
  );
};
