import { type ReactNode } from 'react';
import { Box, Divider, Group, Text } from '@mantine/core';

import { usePushState } from '../../hooks/use-back-button';
import { MdOutlineStorage } from 'react-icons/md';
import { Menu } from '../common';
import { useSettingsMenu } from '../../hooks/use-settings-menu';
import { SETTINGS_SECTIONS } from '../../context/settings-menu';

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

// TODO: BUILD_TAG
// TODO: Underlying Browser
// TODO: Logs > screen w/ download/export
export const Dev = () => {
  const { open } = useSettingsMenu();
  usePushState();

  return (
    <Box mt="md">
      <Item title="Version:" value={APP_VERSION} />
      <Item title="Build Date:" value={BUILD_DATE} />
      <Divider my="xl" />
      <Menu
        items={[
          {
            title: 'Manage Storage',
            icon: <MdOutlineStorage size={24} />,
            onClick: () => open(SETTINGS_SECTIONS.MANAGE_STORAGE),
          },
        ]}
      />
    </Box>
  );
};
