import { ActionIcon, Box, Button, Group, Text, TextInput } from '@mantine/core';
import { usePushState } from '../../hooks/use-back-button';
import { usePalette } from '../../hooks/use-palette';
import {
  MdAdd,
  MdCircle,
  MdDelete,
  MdEdit,
  MdOutlineCircle,
  MdOutlineSearch,
} from 'react-icons/md';
import type { PaletteType } from '../../../palette/types';
import { PRESET_PALETTES } from '../../../palette/contants';
import { PaletteWrapper } from '../../context/palette/palette-provider';
import { useState } from 'react';

const ITEM_SEARCH_MINIMUM = 6;

const SelectedIcon = ({ selected }: { selected: boolean }) => {
  return selected ? <MdCircle /> : <MdOutlineCircle />;
};

const blocks = [1, 2, 3, 4, 5];

const PaletteThumbnail = ({ palette }: { palette: PaletteType }) => {
  return (
    <PaletteWrapper palette={palette}>
      <div className="tile-preview-container">
        {blocks.map(val => (
          <div
            key={`palette-preview-block-${val}`}
            className={`tile tile-${val} tile-preview`}
          />
        ))}
      </div>
    </PaletteWrapper>
  );
};

type PaletteItemProps = {
  palette: PaletteType;
  onClick: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

const PaletteItem = ({
  palette,
  onClick,
  onDelete,
  onEdit,
}: PaletteItemProps) => {
  const { palette: currentPalette } = usePalette();

  return (
    <Group className="history-item" justify="space-between">
      <Button variant="text" onClick={onClick} size="xl">
        <Group>
          <SelectedIcon selected={currentPalette.name === palette.name} />
          <PaletteThumbnail palette={palette} />
          <Text size="xl">{palette.name}</Text>
        </Group>
      </Button>
      <Group>
        {onEdit ? (
          <ActionIcon variant="transparent" color="text" onClick={onEdit}>
            <MdEdit size={24} />
          </ActionIcon>
        ) : null}
        {onDelete ? (
          <ActionIcon variant="transparent" color="red" onClick={onDelete}>
            <MdDelete size={24} />
          </ActionIcon>
        ) : null}
      </Group>
    </Group>
  );
};

type PaletteProps = {
  onSelect: () => void;
  onEdit: (palette: PaletteType | null) => void;
  onAdd: () => void;
};

export const Palette = ({ onSelect, onAdd, onEdit }: PaletteProps) => {
  const {
    changePalette,
    customPalettes,
    deletePalette,
    palette: currentPalette,
  } = usePalette();
  const [filter, setFilter] = useState('');
  usePushState();

  const onSelectItem = (val: PaletteType) => {
    changePalette(val);
    onSelect();
  };

  const sortedCustomPalettes = customPalettes.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const filterPalettes = (palette: PaletteType) => {
    if (!filter) return true;

    return palette.name.toLowerCase().startsWith(filter.toLowerCase());
  };

  const totalItemAmount = PRESET_PALETTES.length + customPalettes.length;

  const filteredPresets = PRESET_PALETTES.filter(filterPalettes);
  const filteredCustom = sortedCustomPalettes.filter(filterPalettes);

  return (
    <Box mt="md">
      <Box mb="md">
        {totalItemAmount > ITEM_SEARCH_MINIMUM ? (
          <TextInput
            leftSection={<MdOutlineSearch />}
            label="Palette Name"
            name="filter"
            value={filter}
            onChange={e => setFilter(e.currentTarget.value)}
          />
        ) : null}
      </Box>
      <Box>
        <Text size="xl" ta="center" mb="md">
          Presets
        </Text>
        <ul className="menu-list">
          {filteredPresets.map(item => {
            return (
              <li key={item.name}>
                <PaletteItem
                  palette={item}
                  onClick={() => onSelectItem(item)}
                />
              </li>
            );
          })}
        </ul>
      </Box>
      <Box>
        <Group align="center" justify="center">
          <Text size="xl" ta="center">
            Custom
          </Text>
          <ActionIcon
            color="text"
            variant="transparent"
            onClick={onAdd}
            aria-label="Add Custom Palette"
          >
            <MdAdd size={24} />
          </ActionIcon>
        </Group>
        <ul className="menu-list">
          {filteredCustom.map(item => {
            return (
              <li key={item.name}>
                <PaletteItem
                  palette={item}
                  onClick={() => onSelectItem(item)}
                  onDelete={
                    item.name === currentPalette.name
                      ? undefined
                      : () => deletePalette(item)
                  }
                  onEdit={() => {
                    onEdit(item);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Box>
    </Box>
  );
};
