export const CURRENT_PALETTE_KEY = 'currentPalette';

export const getCurrentPalette = () => {
  return localStorage.getItem(CURRENT_PALETTE_KEY);
};

export const savePalette = (val: string) => {
  localStorage.setItem(CURRENT_PALETTE_KEY, val);
};
