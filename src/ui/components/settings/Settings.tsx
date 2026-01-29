import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Group } from '@mantine/core';
import { MdEdit, MdEqualizer, MdPalette, MdShuffle } from 'react-icons/md';

import { useGame } from '../../hooks/use-game';
import { Menu, Modal } from '../common';
import { useBackButton, usePushState } from '../../hooks/use-back-button';
import { Seed } from '../seed';
import { History } from './History';
import './settings.css';
import { Stats } from './Stats';
import { NewSeed } from './NewSeed';
import { EnterSeed } from './EnterSeed';
import { saveScroll } from '../../../storage/misc';
import { Palette } from './Palette';
import { PaletteEdit } from './PaletteEdit';
import type { PaletteType } from '../../../palette/types';

type SettingsProps = {
  open: boolean;
  onClose: () => void;
};

type SettingsSections =
  | 'settings'
  | 'new'
  | 'enter'
  | 'history'
  | 'stats'
  | 'palette'
  | 'paletteCustom';

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

export const Settings = ({ open, onClose }: SettingsProps) => {
  const { game } = useGame();
  const [section, setSection] = useState<SettingsSections>('settings');
  const [statSeed, setStatSeed] = useState<string | null>(null);
  const [customPalette, setCustomPalette] = useState<PaletteType | null>(null);
  const scrollableRef = useRef(null);
  usePushState();

  useEffect(() => {
    // Unset scroll on dismount
    return () => {
      saveScroll(0);
    };
  }, []);

  const toMainSettings = () => {
    setSection('settings');
    saveScroll(0);
  };

  const handleBack = useCallback(() => {
    if (section === 'settings') {
      onClose();
    } else if (section === 'stats') {
      setSection('history');
      setStatSeed(null);
    } else if (section === 'paletteCustom') {
      setSection('palette');
      setCustomPalette(null);
    } else {
      toMainSettings();
    }

    return;
  }, [section]);
  useBackButton(handleBack);

  const handleClose = () => {
    setStatSeed(null);
    toMainSettings();
    onClose();
  };

  return (
    <Modal
      title={getTitle(section)}
      opened={open}
      onClose={handleClose}
      onBack={section !== 'settings' ? handleBack : undefined}
      ref={scrollableRef}
    >
      {section === 'settings' ? (
        <>
          <Group justify="center">
            <Seed seed={game.seed} />
          </Group>
          <Box mt="md">
            <Menu
              items={[
                {
                  title: 'New Seed',
                  icon: <MdShuffle size={24} />,
                  onClick: () => setSection('new'),
                },
                {
                  title: 'Enter Seed',
                  icon: <MdEdit size={24} />,
                  onClick: () => setSection('enter'),
                },
                {
                  title: 'History',
                  icon: <MdEqualizer size={24} />,
                  onClick: () => setSection('history'),
                },
                {
                  title: 'Palettes',
                  icon: <MdPalette size={24} />,
                  onClick: () => setSection('palette'),
                },
              ]}
            />
          </Box>
        </>
      ) : null}
      {section === 'new' ? <NewSeed onDone={handleClose} /> : null}
      {section === 'enter' ? <EnterSeed onDone={handleClose} /> : null}
      {section === 'history' ? (
        <History
          scrollableRef={scrollableRef}
          onSelect={seed => {
            setStatSeed(seed);
            setSection('stats');
          }}
        />
      ) : null}
      {section === 'stats' && statSeed ? (
        <Stats seed={statSeed} onDone={handleClose} />
      ) : null}
      {section === 'palette' ? (
        <Palette
          onSelect={handleClose}
          onAdd={() => {
            setSection('paletteCustom');
          }}
          onEdit={currentPalette => {
            setCustomPalette(currentPalette);
            setSection('paletteCustom');
          }}
        />
      ) : null}
      {section === 'paletteCustom' ? (
        <PaletteEdit palette={customPalette} onDone={handleBack} />
      ) : null}
    </Modal>
  );
};
