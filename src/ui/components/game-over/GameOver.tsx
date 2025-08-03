import { Box, Button, Text } from '@mantine/core';
import { useGame } from '../../hooks/use-game';
import { Modal } from '../common';
import { generateSeed } from '../../../game/seed';

export const GameOver = () => {
  const { game, init } = useGame();
  const isGameOver = game.status === 'DONE';

  if (!isGameOver) {
    return null;
  }

  const handleRetry = () => {
    init(game.seed, true);
  };

  const handleNewGame = () => {
    const seed = generateSeed();
    init(seed, true);
  };

  return (
    <Modal title="" opened={true}>
      <h2>
        <Text ta="center" size="48px">
          Game Over!
        </Text>
        <Text ta="center" mt="md">
          Seed: {game.seed}
        </Text>
      </h2>
      <Box my="lg" ta="center">
        <Text size="lg">Level: {game.level.level}</Text>
        <Text size="lg">Score: {game.score}</Text>
      </Box>
      <Box mt="lg">
        <Button
          size="lg"
          mb="md"
          fullWidth={true}
          variant="filled"
          onClick={handleRetry}
        >
          Retry
        </Button>
        <Button
          size="lg"
          fullWidth={true}
          variant="outline"
          onClick={handleNewGame}
        >
          New Game
        </Button>
      </Box>
    </Modal>
  );
};
