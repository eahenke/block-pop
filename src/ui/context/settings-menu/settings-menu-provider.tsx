import { useCallback, useState, type ReactNode } from 'react';

import { SettingsMenuContext } from './settings-menu-context';
import { useModalsStack } from '@mantine/core';
import { SETTINGS_SECTIONS, type SettingsSections } from './constants';
import { useBackButton } from '../../hooks/use-back-button';

const modalIds = Object.values(SETTINGS_SECTIONS);

export const SettingsMenuProvider = ({ children }: { children: ReactNode }) => {
  const stack = useModalsStack(modalIds);
  const [currentOpen, setCurrentOpen] = useState<SettingsSections | null>(null);

  const open = (id: SettingsSections) => {
    setCurrentOpen(id);
    stack.open(id);
  };

  const closeAll = () => {
    setCurrentOpen(null);
    stack.closeAll();
  };

  const close = (id: SettingsSections) => {
    stack.close(id);
  };

  const toMainSettings = useCallback(() => {
    if (currentOpen && currentOpen !== SETTINGS_SECTIONS.SETTINGS) {
      close(currentOpen);
      setCurrentOpen(SETTINGS_SECTIONS.SETTINGS);
    }
  }, [currentOpen]);

  const handleBack = useCallback(() => {
    if (!currentOpen) {
      return;
    }

    if (currentOpen === SETTINGS_SECTIONS.SETTINGS) {
      closeAll();
    } else if (currentOpen === SETTINGS_SECTIONS.STATS) {
      setCurrentOpen(SETTINGS_SECTIONS.HISTORY);
      stack.close(currentOpen);
    } else if (currentOpen === SETTINGS_SECTIONS.PALETTE_CUSTOM) {
      setCurrentOpen(SETTINGS_SECTIONS.PALETTE);
      stack.close(currentOpen);
    } else {
      stack.close(currentOpen);
      toMainSettings();
    }

    return;
  }, [currentOpen, toMainSettings]);
  useBackButton(handleBack);

  const value = {
    ...stack,
    state: stack.state,
    open,
    close,
    closeAll,
    currentOpen,
    toMainSettings,
    handleBack,
  };

  return (
    <SettingsMenuContext.Provider value={value}>
      {children}
    </SettingsMenuContext.Provider>
  );
};
