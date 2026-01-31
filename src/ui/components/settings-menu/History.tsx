import { ActionIcon, Box, Button, Group, Text, TextInput } from '@mantine/core';
import { MdDelete, MdOutlineSearch } from 'react-icons/md';
import { useSeedHistory } from '../../hooks/use-seed-history';
import { useGame } from '../../hooks/use-game';
import { usePushState } from '../../hooks/use-back-button';
import { useState } from 'react';
import { SortButton } from '../common/sort-button';
import { Loading } from '../common';

const ITEM_SEARCH_MINIMUM = 7;

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
  onSelect: (seed: string) => void;
};

export const History = ({ onSelect }: HistoryProps) => {
  const { game } = useGame();
  const { seedHistory, deleteSeedInfo } = useSeedHistory();
  const [sortProperty, setSortProperty] = useState<SortProperty>('date');
  const [asc, setAsc] = useState(false);
  const [filter, setFilter] = useState('');
  usePushState();

  if (!seedHistory) {
    return <Loading visible />;
  }

  const onSelectItem = (seed: string) => {
    onSelect(seed);
  };

  const handleSortProperty = (prop: SortProperty) => {
    if (prop !== sortProperty) {
      setAsc(false);
      setSortProperty(prop);
    } else {
      setAsc(curr => !curr);
    }
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

  const filteredItems = items.filter(item => {
    if (!filter) return true;

    return item.seed.toLowerCase().startsWith(filter.toLowerCase());
  });

  return (
    <Box mt="md">
      <Box mb="md">
        {items.length > ITEM_SEARCH_MINIMUM ? (
          <TextInput
            leftSection={<MdOutlineSearch />}
            label="Seed Name"
            name="filter"
            value={filter}
            onChange={e => setFilter(e.currentTarget.value)}
          />
        ) : null}
      </Box>
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
        {filteredItems.map(item => {
          return (
            <li key={item.seed}>
              <HistoryItem
                title={item.seed}
                highscore={item.highScore?.score}
                subtitle={`Last played: ${item.lastPlayed}`}
                onClick={() => onSelectItem(item.seed)}
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
