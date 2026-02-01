import {
  Box,
  Button,
  Collapse,
  Group,
  Loader,
  Text,
  TextInput,
} from '@mantine/core';
import { useStorageEstimate } from '../../hooks/use-storage-estimate';
import { usePushState } from '../../hooks/use-back-button';
import { useState, type ReactNode } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useManageStorage } from '../../hooks/use-manage-storage';

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

type DeleteWithConfirmProps = {
  deleteKey: string;
  onDelete: () => void;
  text: ReactNode;
};

export const DeleteWithConfirm = ({
  deleteKey,
  onDelete,
  text,
}: DeleteWithConfirmProps) => {
  const [opened, setOpened] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const toggle = () => {
    setOpened(prev => !prev);
  };

  return (
    <section>
      <Button
        variant="text"
        onClick={toggle}
        rightSection={
          opened ? <MdArrowDropUp size={24} /> : <MdArrowDropDown size={24} />
        }
        fullWidth={true}
        size="lg"
        mb="md"
      >
        {typeof text === 'string' ? <Text size="lg">{text}</Text> : text}
      </Button>
      <Collapse in={opened}>
        <Text size="sm">
          Type{' '}
          <Text component="span" c="red">
            "{deleteKey}"
          </Text>{' '}
          to delete. This cannot be undone.
        </Text>
        <Box my="sm">
          <TextInput
            value={confirmText}
            onChange={e => setConfirmText(e.currentTarget.value)}
            label=""
          />
        </Box>
        <Button
          fullWidth={true}
          onClick={() => {
            if (confirmText !== deleteKey) {
              return;
            }
            onDelete();
          }}
          disabled={confirmText !== deleteKey}
        >
          Delete
        </Button>
      </Collapse>
    </section>
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
      <DeleteWithConfirm
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
