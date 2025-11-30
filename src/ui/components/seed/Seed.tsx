import { ActionIcon, Group, Text } from '@mantine/core';
import { useLongPress } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { MdContentCopy } from 'react-icons/md';
import { createDeepLinkSeed } from '../../utils/url';

type SeedProps = {
  seed: string;
  title?: string;
};

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

export const Seed = ({ seed, title = 'Current seed:' }: SeedProps) => {
  const handleDeepCopy = async () => {
    const deepLink = createDeepLinkSeed(seed);
    try {
      await copyToClipboard(deepLink);
      notifications.show({
        message: 'Copied deep link to clipboard',
      });
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
      notifications.show({
        message: 'Failed to copy',
      });
    }
  };

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

  const handlers = useLongPress(handleDeepCopy);

  return (
    <Group component="span" align="center">
      <Text component="span">
        {title} {seed}
      </Text>
      <ActionIcon
        variant="transparent"
        color="text"
        onClick={handleCopy}
        {...handlers}
        aria-label="Copy"
      >
        <MdContentCopy size="24" />
      </ActionIcon>
    </Group>
  );
};
