import React from 'react';

export type PaletteContext = {
  palette: string;
  changePalette: (val: string) => void;
};

export const PaletteContext = React.createContext<PaletteContext | null>(null);
