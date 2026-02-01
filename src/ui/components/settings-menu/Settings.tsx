import { Box, Group } from '@mantine/core';
import {
  MdDeveloperMode,
  MdEdit,
  MdEqualizer,
  MdPalette,
  MdShuffle,
} from 'react-icons/md';

import { useGame } from '../../hooks/use-game';
import { Menu } from '../common';
import { usePushState } from '../../hooks/use-back-button';
import { Seed } from '../seed';
import { useSettingsMenu } from '../../hooks/use-settings-menu';
import {
  SETTINGS_SECTIONS,
  type SettingsSections,
} from '../../context/settings-menu';
import { useState } from 'react';
import { useNClicks } from '../../hooks/use-n-clicks';

export const Settings = () => {
  const { game } = useGame();
  const { open } = useSettingsMenu();
  const [showDev, setShowDev] = useState(false);
  const handleTripleClick = useNClicks(3);
  usePushState();

  const setSection = (val: SettingsSections) => {
    open(val);
  };

  const onTripleClick = handleTripleClick(() => {
    setShowDev(prev => !prev);
  });

  const items = [
    {
      title: 'New Seed',
      icon: <MdShuffle size={24} />,
      onClick: () => setSection(SETTINGS_SECTIONS.NEW),
    },
    {
      title: 'Enter Seed',
      icon: <MdEdit size={24} />,
      onClick: () => setSection(SETTINGS_SECTIONS.ENTER),
    },
    {
      title: 'History',
      icon: <MdEqualizer size={24} />,
      onClick: () => setSection(SETTINGS_SECTIONS.HISTORY),
    },
    {
      title: 'Palettes',
      icon: <MdPalette size={24} />,
      onClick: () => setSection(SETTINGS_SECTIONS.PALETTE),
    },
  ];

  if (showDev) {
    items.push({
      title: 'Dev',
      icon: <MdDeveloperMode size={24} />,
      onClick: () => setSection(SETTINGS_SECTIONS.DEV),
    });
  }

  return (
    <>
      <Group justify="center">
        <Seed seed={game.seed} />
      </Group>
      <Box mt="md">
        <Menu items={items} />
        <Box
          onClick={onTripleClick}
          pos="absolute"
          bottom={0}
          left={0}
          right={0}
          h="xl"
          w="full"
        />
      </Box>
    </>
  );
};
