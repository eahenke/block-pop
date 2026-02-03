import { useState, type ReactNode } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { Box, Button, Collapse, Text, TextInput } from '@mantine/core';

type DeleteConfirmProps = {
  deleteKey: string;
  onDelete: () => void;
  text: ReactNode;
};

export const DeleteConfirm = ({
  deleteKey,
  onDelete,
  text,
}: DeleteConfirmProps) => {
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
        fullWidth
        justify="space-between"
        size="lg"
        mb="md"
        styles={{
          inner: {
            flex: 1,
          },
        }}
      >
        {text}
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
