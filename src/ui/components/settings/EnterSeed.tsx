import { useState } from 'react';
import { useGame } from '../../hooks/use-game';
import { usePushState } from '../../hooks/use-back-button';
import { notifications } from '@mantine/notifications';
import { Box, Button, TextInput } from '@mantine/core';

export const EnterSeed = ({ onDone }: { onDone: () => void }) => {
  const { init } = useGame();
  const [error, setError] = useState('');
  const [seedValue, setSeedValue] = useState('');
  usePushState();

  const handleEnterSeed = () => {
    setError('');
    try {
      init(seedValue, true);
      onDone();
    } catch {
      setError('Error entering seed');
      notifications.show({
        message: 'Failed to enter seed',
      });
    }
  };

  return (
    <Box mt="sm">
      <Box mb="sm">
        <TextInput
          value={seedValue}
          onChange={e => setSeedValue(e.currentTarget.value)}
          label="Seed"
        />

        {error ? <span>{error}</span> : null}
      </Box>
      <Button fullWidth={true} onClick={() => handleEnterSeed()}>
        Start
      </Button>
    </Box>
  );
};
