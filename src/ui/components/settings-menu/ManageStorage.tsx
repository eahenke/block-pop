import { Box, Group, Loader, Text } from '@mantine/core';
import { useStorageEstimate } from '../../hooks/use-storage-estimate';
import { usePushState } from '../../hooks/use-back-button';
import { type ReactNode } from 'react';
import { useManageStorage } from '../../hooks/use-manage-storage';
import { DeleteConfirm } from '../common';

const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
const formatBytes = (bytes?: number | null) => {
  if (bytes === null || bytes === undefined) return ' - ';

  let count = 0;
  let size = bytes;
  const denominator = 1024;
  while (count < units.length && size > denominator) {
    size /= denominator;
    count++;
  }
  return `${size.toFixed(0)}${units[count]}`;
};

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

export const ManageStorage = () => {
  const { estimate, loading, refetch } = useStorageEstimate();
  const { deleteGameData } = useManageStorage();
  usePushState();

  const bytesUsed = estimate?.usage ?? null;
  const byteQuota = estimate?.quota ?? null;
  return (
    <Box mt="md">
      <Item
        title="Storage Used:"
        value={loading ? <Loader /> : formatBytes(bytesUsed)}
      />
      <Item
        title="Storage Quota:"
        value={loading ? <Loader /> : formatBytes(byteQuota)}
      />
      <DeleteConfirm
        text={
          <Box>
            <Text size="lg">Delete Game Data</Text>
            <Text size="sm" component="span">
              Delete history, palettes, and other game data.
            </Text>
          </Box>
        }
        onDelete={async () => {
          await deleteGameData();
          refetch();
        }}
        deleteKey="Delete Game Data"
      />
    </Box>
  );
};
