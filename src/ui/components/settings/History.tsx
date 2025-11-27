import { ActionIcon, Box, Button, Group, Text } from '@mantine/core';
import { MdDelete } from 'react-icons/md';
import { useSeedHistory } from '../../hooks/use-seed-history';
import type { SeedInfo } from '../../../game/types';
import { useGame } from '../../hooks/use-game';
import { usePushState } from '../../hooks/use-back-button';
import { useEffect, useState, type RefObject } from 'react';
import { SortButton } from '../common/sort-button';
import { getScroll, saveScroll } from '../../../storage/misc';

type HistoryItemProps = {
  title: string;
  subtitle?: string;
  highscore?: number;
  onClick: () => void;
  onDelete?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const HistoryItem = ({
  title,
  highscore,
  subtitle,
  onClick,
  size = 'xl',
  onDelete,
}: HistoryItemProps) => {
  return (
    <Group className="history-item" justify="space-between">
      <Button variant="text" onClick={onClick} size={size}>
        <Box>
          <Group justify="space-between">
            <Text>{title}</Text>
            {highscore ? (
              <Text className="history-score">{highscore}</Text>
            ) : null}
          </Group>
          {subtitle ? <Text size="xs">{subtitle}</Text> : null}
        </Box>
      </Button>
      {onDelete ? (
        <ActionIcon variant="transparent" color="red" onClick={onDelete}>
          <MdDelete size={24} />
        </ActionIcon>
      ) : null}
    </Group>
  );
};

type SortProperty = 'date' | 'score';

type HistoryProps = {
  onSelect: (seedInfo: SeedInfo) => void;
  scrollableRef: RefObject<HTMLElement | null>;
};

export const History = ({ onSelect, scrollableRef }: HistoryProps) => {
  const { game } = useGame();
  const { seedHistory, deleteSeedInfo } = useSeedHistory();
  const [sortProperty, setSortProperty] = useState<SortProperty>('date');
  const [asc, setAsc] = useState(false);
  usePushState();

  useEffect(() => {
    const savedScrollPos = getScroll();
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = savedScrollPos;
    }
  }, [scrollableRef]);

  const onSelectItem = (seedInfo: SeedInfo) => {
    if (scrollableRef.current) {
      saveScroll(scrollableRef.current.scrollTop);
    }
    onSelect(seedInfo);
  };

  const items = Object.values(seedHistory).sort((a, b) => {
    const directionMultiplier = asc ? -1 : 1;

    if (sortProperty === 'score') {
      return (
        ((b.highScore?.score || 0) - (a.highScore?.score || 0)) *
        directionMultiplier
      );
    }

    return b.lastPlayed.localeCompare(a.lastPlayed) * directionMultiplier;
  });

  const handleSortProperty = (prop: SortProperty) => {
    if (prop !== sortProperty) {
      setAsc(false);
      setSortProperty(prop);
    } else {
      setAsc(curr => !curr);
    }
  };

  return (
    <Box mt="md">
      <Box className="history-grid">
        <Group justify="space-around">
          <SortButton
            selected={sortProperty === 'date'}
            size="xs"
            onClick={() => handleSortProperty('date')}
            asc={asc}
          >
            Date
          </SortButton>
          <SortButton
            selected={sortProperty === 'score'}
            size="xs"
            onClick={() => handleSortProperty('score')}
            asc={asc}
          >
            Score
          </SortButton>
        </Group>
      </Box>
      <ul className="menu-list">
        {items.map(item => {
          return (
            <li key={item.seed}>
              <HistoryItem
                title={item.seed}
                highscore={item.highScore?.score}
                subtitle={`Last played: ${item.lastPlayed}`}
                onClick={() => onSelectItem(item)}
                onDelete={
                  item.seed === game.seed
                    ? undefined
                    : () => deleteSeedInfo(item.seed)
                }
              />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};
