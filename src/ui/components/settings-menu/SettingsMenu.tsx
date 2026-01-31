import { useState, type ReactNode } from 'react';
import type { TransitionOverride } from '@mantine/core';
import {
  SETTINGS_SECTIONS,
  type SettingsSections,
} from '../../context/settings-menu';
import { useSettingsMenu } from '../../hooks/use-settings-menu';
import { Modal } from '../common';
import { Settings } from './Settings';
import { NewSeed } from './NewSeed';
import { EnterSeed } from './EnterSeed';
import { History } from './History';
import { Stats } from './Stats';
import type { PaletteType } from '../../../palette/types';
import { Palette } from './Palette';
import { PaletteEdit } from './PaletteEdit';
import './settings.css';

const getTitle = (section: SettingsSections): string => {
  const titles: Record<SettingsSections, string> = {
    settings: 'Settings',
    new: 'New Seed',
    enter: 'Enter Seed',
    history: 'History',
    stats: 'Statistics',
    palette: 'Palettes',
    paletteCustom: 'Custom Palette',
  };

  return titles[section];
};

const defaultTransition: TransitionOverride = {
  duration: 0,
};

const SettingsMenuSection = ({
  id,
  children,
  transitionProps,
}: {
  id: SettingsSections;
  children: ReactNode;
  transitionProps?: TransitionOverride;
}) => {
  const stack = useSettingsMenu();
  return (
    <Modal
      title={getTitle(id)}
      onBack={
        stack.currentOpen !== SETTINGS_SECTIONS.SETTINGS
          ? stack.handleBack
          : undefined
      }
      {...stack.register(id)}
      onClose={() => stack.closeAll()}
      transitionProps={transitionProps || defaultTransition}
    >
      {children}
    </Modal>
  );
};

export const SettingsMenu = () => {
  const stack = useSettingsMenu();
  const [statSeed, setStatSeed] = useState<string | null>(null);
  const [customPalette, setCustomPalette] = useState<PaletteType | null>(null);

  return (
    <>
      <SettingsMenuSection
        id={SETTINGS_SECTIONS.SETTINGS}
        transitionProps={{ duration: 200, transition: 'slide-left' }}
      >
        <Settings />
      </SettingsMenuSection>
      <SettingsMenuSection id={SETTINGS_SECTIONS.NEW}>
        <NewSeed onDone={stack.closeAll} />
      </SettingsMenuSection>
      <SettingsMenuSection id={SETTINGS_SECTIONS.ENTER}>
        <EnterSeed onDone={stack.closeAll} />
      </SettingsMenuSection>
      <SettingsMenuSection id={SETTINGS_SECTIONS.HISTORY}>
        <History
          onSelect={seed => {
            setStatSeed(seed);
            stack.open(SETTINGS_SECTIONS.STATS);
          }}
        />
      </SettingsMenuSection>
      <SettingsMenuSection id={SETTINGS_SECTIONS.STATS}>
        <Stats
          // Can technically be null, but will be set before opening
          seed={statSeed as string}
          onDone={() => {
            setStatSeed(null);
            stack.closeAll();
          }}
        />
      </SettingsMenuSection>
      <SettingsMenuSection id={SETTINGS_SECTIONS.PALETTE}>
        <Palette
          onSelect={stack.closeAll}
          onAdd={() => {
            stack.open(SETTINGS_SECTIONS.PALETTE_CUSTOM);
          }}
          onEdit={currentPalette => {
            setCustomPalette(currentPalette);
            stack.open(SETTINGS_SECTIONS.PALETTE_CUSTOM);
          }}
        />
      </SettingsMenuSection>
      <SettingsMenuSection id={SETTINGS_SECTIONS.PALETTE_CUSTOM}>
        <PaletteEdit palette={customPalette} onDone={stack.handleBack} />
      </SettingsMenuSection>
    </>
  );
};
