import React from 'react';
import type { PaletteType } from '../../../palette/types';

export type PaletteContext = {
  palette: PaletteType;
  changePalette: (val: PaletteType) => void;
};

export const PaletteContext = React.createContext<PaletteContext | null>(null);
