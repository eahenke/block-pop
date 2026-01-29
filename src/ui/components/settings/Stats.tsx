import { type ReactNode } from 'react';
import { Box, Button, Collapse, Group, Text } from '@mantine/core';
import cx from 'classnames';
import type { SeedInfo } from '../../../game/types';
import { Seed } from '../seed';
import { useGame } from '../../hooks/use-game';

import { usePushState } from '../../hooks/use-back-button';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useDisclosure } from '@mantine/hooks';
import { useSeedInfo } from '../../hooks/use-seed-info';
import { Loading } from '../common';

type AttemptHistoryProps = {
  seedInfo: SeedInfo;
};

const AttemptHistory = ({ seedInfo }: AttemptHistoryProps) => {
  const [opened, { toggle }] = useDisclosure(false);

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
      >
        <Text size="lg">Attempt History</Text>
      </Button>
      <Collapse in={opened}>
        <ul className="menu-list">
          {seedInfo.history.map(attempt => (
            <li key={attempt.number}>
              <Box mb="md">
                <Group justify="space-between">
                  <Text>Attempt {attempt.number}:</Text>
                  <Text
                    className={cx({
                      'history-score':
                        attempt.number === seedInfo.highScore?.attempt,
                    })}
                  >
                    {attempt.score}
                  </Text>
                </Group>
                <Text size="xs">{attempt.date}</Text>
              </Box>
            </li>
          ))}
        </ul>
      </Collapse>
    </section>
  );
};

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
  seed: string;
  onDone: () => void;
};

export const Stats = ({ seed, onDone }: StatsProps) => {
  const { init } = useGame();
  const { seedInfo } = useSeedInfo(seed);
  usePushState();

  const handleReplay = () => {
    init(seed, true);
    onDone();
  };

  if (!seedInfo) {
    return <Loading visible />;
  }

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
      {seedInfo.history.length > 0 ? (
        <AttemptHistory seedInfo={seedInfo} />
      ) : null}
      <Button size="lg" fullWidth={true} onClick={handleReplay} mt="xl">
        Replay
      </Button>
    </Box>
  );
};
