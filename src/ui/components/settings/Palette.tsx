import { Box, Button, Group, Text } from '@mantine/core';
import { usePushState } from '../../hooks/use-back-button';
import { usePalette } from '../../hooks/use-palette';

type PaletteProps = {
  onSelect: () => void;
};

// TODO: make dynamic
const PRESETS = ['classic', 'monochrome', 'preset-1'];

const PalettePreview = ({ palette }: { palette: string }) => {
  return (
    <div className="tile-preview-container" data-palette={palette}>
      <div className="tile tile-1 tile-preview" />
      <div className="tile tile-2 tile-preview" />
      <div className="tile tile-3 tile-preview" />
      <div className="tile tile-4 tile-preview" />
      <div className="tile tile-5 tile-preview" />
    </div>
  );
};

type PaletteItemProps = {
  palette: string;
  onClick: () => void;
};

const PaletteItem = ({ palette, onClick }: PaletteItemProps) => {
  return (
    <Group className="history-item" justify="space-between">
      <Button variant="text" onClick={onClick} size="xl" fullWidth={true}>
        <Group>
          <PalettePreview palette={palette} />
          <Text size="xl">{palette}</Text>
        </Group>
      </Button>
    </Group>
  );
};

export const Palette = ({ onSelect }: PaletteProps) => {
  const { changePalette } = usePalette();
  usePushState();

  const onSelectItem = (val: string) => {
    changePalette(val);
    onSelect();
  };

  return (
    <Box mt="md">
      <Text size="xl" ta="center" mb="md">
        Presets
      </Text>
      <ul className="menu-list">
        {PRESETS.map(item => {
          return (
            <li key={item}>
              <PaletteItem palette={item} onClick={() => onSelectItem(item)} />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};
