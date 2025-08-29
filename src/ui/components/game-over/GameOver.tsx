import { Box, Button, Group, Text } from '@mantine/core';
import { useGame } from '../../hooks/use-game';
import { generateSeed } from '../../../game/seed';

export const GameOver = () => {
  const { game, init, restart } = useGame();
  const isGameOver = game.status === 'DONE';

  if (!isGameOver) {
    return null;
  }

  const handleRetry = () => {
    restart();
  };

  const handleNewGame = () => {
    const seed = generateSeed();
    init(seed, true);
  };

  return (
    <Box mt="md">
      {/* <Text size="xl">Game Over!</Text> */}
      <Group justify="space-around" mt="md">
        <Button size="lg" variant="filled" onClick={handleRetry}>
          Retry
        </Button>
        <Button size="lg" variant="outline" onClick={handleNewGame}>
          New Game
        </Button>
      </Group>
    </Box>
  );
};

export const GameOverBanner = () => {
  const { game } = useGame();
  const isGameOver = game.status === 'DONE';

  if (!isGameOver) {
    return null;
  }

  return (
    <div className="game-over-banner">
      <Text size="xl">Game Over!</Text>
    </div>
  );
};
