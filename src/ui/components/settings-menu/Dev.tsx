import { type ReactNode } from 'react';
import { Box, Divider, Group, Text } from '@mantine/core';

import { usePushState } from '../../hooks/use-back-button';
import { MdOutlineListAlt, MdOutlineStorage } from 'react-icons/md';
import { Menu } from '../common';
import { useSettingsMenu } from '../../hooks/use-settings-menu';
import { SETTINGS_SECTIONS } from '../../context/settings-menu';
import {
  APP_VERSION,
  BUILD_DATE,
  BUILD_TAG,
} from '../../../config/environment';

type ItemProps = {
  title: ReactNode;
  value: ReactNode;
};

const Item = ({ title, value }: ItemProps) => {
  return (
    <Group justify="space-between" mb="md">
      <Text size="lg">{title}</Text>
      <Text size="lg">{value}</Text>
    </Group>
  );
};

// TODO: Underlying Browser
// TODO: Logs > screen w/ download/export
export const Dev = () => {
  const { open } = useSettingsMenu();
  usePushState();

  return (
    <Box mt="md">
      <Item title="Version:" value={APP_VERSION} />
      <Item title="Build Date:" value={BUILD_DATE} />
      <Item title="Build Tag:" value={BUILD_TAG} />
      <Divider my="xl" />
      <Menu
        items={[
          {
            title: 'Manage Storage',
            icon: <MdOutlineStorage size={24} />,
            onClick: () => open(SETTINGS_SECTIONS.MANAGE_STORAGE),
          },
          {
            title: 'Manage Logs',
            icon: <MdOutlineListAlt size={24} />,
            onClick: () => open(SETTINGS_SECTIONS.LOGS),
          },
        ]}
      />
    </Box>
  );
};
