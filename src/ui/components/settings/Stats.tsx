import { Box, Button, Group, Text } from '@mantine/core';
import type { SeedInfo } from '../../../game/types';
import { Seed } from '../seed';
import { useGame } from '../../hooks/use-game';
import type { ReactNode } from 'react';
import { usePushState } from '../../hooks/use-back-button';

type StatItemProps = {
  title: ReactNode;
  value: ReactNode;
};

export const StatItem = ({ title, value }: StatItemProps) => {
  return (
    <Group justify="space-between" mb="md">
      <Text size="lg">{title}</Text>
      <Text size="lg">{value}</Text>
    </Group>
  );
};

type StatsProps = {
  seedInfo: SeedInfo;
  onDone: () => void;
};

export const Stats = ({ seedInfo, onDone }: StatsProps) => {
  const { init } = useGame();
  usePushState();

  const handleReplay = () => {
    init(seedInfo.seed, true);
    onDone();
  };

  const highScore = seedInfo.highScore;

  return (
    <Box>
      <Group justify="center" mb="xl">
        <Seed title="Seed:" seed={seedInfo.seed} />
      </Group>
      <StatItem title="Attempts:" value={seedInfo.attempts} />
      {highScore ? (
        <>
          <StatItem title="Highscore:" value={highScore.score} />
          <StatItem
            title="Blocks Remaining:"
            value={highScore.blocksRemaining}
          />
          <StatItem
            title="Highscore achieved on attempt:"
            value={highScore.attempt}
          />
        </>
      ) : null}
      <Button size="lg" fullWidth={true} onClick={handleReplay} mt="xl">
        Replay
      </Button>
    </Box>
  );
};
