import { Box, Button, Text } from '@mantine/core';
import { generateSeed } from '../../../game/seed';
import { usePushState } from '../../hooks/use-back-button';
import { useGame } from '../../hooks/use-game';

export const NewSeed = ({ onDone }: { onDone: () => void }) => {
  const { init } = useGame();
  usePushState();

  const seed = generateSeed();

  const handleNewSeed = () => {
    init(seed, true);
    onDone();
  };

  return (
    <>
      <Box mb="sm" mt="sm">
        <Text>
          This will start a new game with seed{' '}
          <Text component="span" fw={700}>
            {seed}
          </Text>
        </Text>
      </Box>
      <Button fullWidth={true} onClick={handleNewSeed}>
        Okay
      </Button>
    </>
  );
};
