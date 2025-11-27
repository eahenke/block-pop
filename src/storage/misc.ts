const HISTORY_SCROLL_KEY = 'historyScroll';

export const saveScroll = (pos: number) => {
  localStorage.setItem(HISTORY_SCROLL_KEY, pos.toString());
};

export const getScroll = () => {
  const pos = localStorage.getItem(HISTORY_SCROLL_KEY);
  if (!pos) return 0;

  return parseInt(pos, 10);
};
