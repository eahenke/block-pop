import { ActionIcon, Box, Button, Group, Text } from '@mantine/core';
import { MdDelete } from 'react-icons/md';
import { useSeedHistory } from '../../hooks/use-seed-history';
import type { SeedInfo } from '../../../game/types';
import { useGame } from '../../hooks/use-game';
import { usePushState } from '../../hooks/use-back-button';

type HistoryItemProps = {
  title: string;
  subtitle?: string;
  onClick: () => void;
  onDelete?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const HistoryItem = ({
  title,
  subtitle,
  onClick,
  size = 'xl',
  onDelete,
}: HistoryItemProps) => {
  return (
    <Group className="history-item" justify="space-between">
      <Button variant="text" onClick={onClick} size={size}>
        <Box>
          <Text>{title}</Text>
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

type HistoryProps = {
  onSelect: (seedInfo: SeedInfo) => void;
};

export const History = ({ onSelect }: HistoryProps) => {
  const { game } = useGame();
  const { seedHistory, deleteSeedInfo } = useSeedHistory();
  usePushState();

  const items = Object.values(seedHistory).sort((a, b) => {
    return b.lastPlayed.localeCompare(a.lastPlayed);
  });
  return (
    <Box mt="md">
      <ul className="menu-list">
        {items.map(item => {
          return (
            <li key={item.seed}>
              <HistoryItem
                title={item.seed}
                subtitle={`Last played: ${item.lastPlayed}`}
                onClick={() => onSelect(item)}
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
