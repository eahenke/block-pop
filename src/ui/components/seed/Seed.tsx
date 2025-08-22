import { ActionIcon, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MdContentCopy } from 'react-icons/md';

type SeedProps = {
  seed: string;
};

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

export const Seed = ({ seed }: SeedProps) => {
  const handleCopy = async () => {
    try {
      await copyToClipboard(seed);
      notifications.show({
        message: 'Copied to clipboard',
      });
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
      notifications.show({
        message: 'Failed to copy',
      });
    }
  };

  return (
    <Group component="span" align="center">
      <Text component="span">Current seed: {seed}</Text>
      <ActionIcon
        variant="transparent"
        color="text"
        onClick={handleCopy}
        aria-label="Copy"
      >
        <MdContentCopy size="24" />
      </ActionIcon>
    </Group>
  );
};
