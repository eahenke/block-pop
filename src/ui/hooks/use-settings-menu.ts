import { useContext } from 'react';
import { SettingsMenuContext } from '../context/settings-menu';

export const useSettingsMenu = () => {
  const context = useContext(SettingsMenuContext);
  if (!context) {
    throw new Error(
      'useSettingsMenu must be used inside of a <SettingsMenuProvider />'
    );
  }

  return {
    ...context,
  };
};
