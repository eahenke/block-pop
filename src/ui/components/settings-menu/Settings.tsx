import { Box, Group } from '@mantine/core';
import { MdEdit, MdEqualizer, MdPalette, MdShuffle } from 'react-icons/md';

import { useGame } from '../../hooks/use-game';
import { Menu } from '../common';
import { usePushState } from '../../hooks/use-back-button';
import { Seed } from '../seed';
import { useSettingsMenu } from '../../hooks/use-settings-menu';
import {
  SETTINGS_SECTIONS,
  type SettingsSections,
} from '../../context/settings-menu';

export const Settings = () => {
  const { game } = useGame();
  const { open } = useSettingsMenu();
  usePushState();

  const setSection = (val: SettingsSections) => {
    open(val);
  };

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

  return (
    <>
      <Group justify="center">
        <Seed seed={game.seed} />
      </Group>
      <Box mt="md">
        <Menu items={items} />
      </Box>
    </>
  );
};
