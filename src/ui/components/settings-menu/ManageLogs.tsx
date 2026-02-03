import { type ReactNode } from 'react';
import { Box, Divider, Group, Text } from '@mantine/core';

import { usePushState } from '../../hooks/use-back-button';
import { MdOutlineDownload } from 'react-icons/md';
import { Menu } from '../common';
import { LOG_RETENTION_DAYS } from '../../../config/environment';
import { getLogs } from '../../../storage/logs';

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

const downloadLogs = async () => {
  const date = new Date().toISOString().slice(0, 10);
  const logs = await getLogs();
  const logsToWrite = JSON.stringify(logs, null, 4);
  const blob = new Blob([logsToWrite], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `logs-${date}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const ManageLogs = () => {
  usePushState();

  return (
    <Box mt="md">
      <Item title="Log Retention:" value={`${LOG_RETENTION_DAYS} Days`} />
      <Divider my="xl" />

      <Menu
        items={[
          {
            title: 'Export Logs',
            icon: <MdOutlineDownload size={24} />,
            onClick: downloadLogs,
          },
        ]}
      />
    </Box>
  );
};
