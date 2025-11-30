import {
  Box,
  Button,
  ColorInput,
  ColorSwatch,
  Text,
  TextInput,
} from '@mantine/core';
import { usePushState } from '../../hooks/use-back-button';
import { useState } from 'react';
import type { PaletteType } from '../../../palette/types';
import { usePalette } from '../../hooks/use-palette';

type PaletteEditProps = {
  palette?: PaletteType | null;
  onDone: () => void;
};

const blocks = [1, 2, 3, 4, 5] as const;

const isCompletePalette = (palette: PaletteType | null) => {
  if (!palette) return false;
  return !!(
    palette.name &&
    palette.block1 &&
    palette.block2 &&
    palette.block3 &&
    palette.block4 &&
    palette.block5
  );
};

export const PaletteEdit = ({ palette, onDone }: PaletteEditProps) => {
  const [error, setError] = useState('');
  const { saveCustomPalette, updatePalette } = usePalette();
  const [currentPalette, setCurrentPalette] = useState<PaletteType>(
    palette || {
      name: '',
      block1: '',
      block2: '',
      block3: '',
      block4: '',
      block5: '',
    }
  );
  usePushState();

  const handleChange = (prop: keyof PaletteType, val: string) => {
    setCurrentPalette({
      ...currentPalette,
      [prop]: val,
    });
  };

  const handleSave = () => {
    try {
      if (!isCompletePalette(currentPalette)) {
        return;
      }

      // If editing an existing palette, delete the original and save a new one
      if (palette) {
        updatePalette(palette.name, currentPalette);
        onDone();
        return;
      }

      saveCustomPalette(currentPalette);
      onDone();
      return;
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        return;
      }
      throw e;
    }
  };

  return (
    <Box mt="sm">
      <Box mb="sm">
        <TextInput
          value={currentPalette.name}
          onChange={e => handleChange('name', e.currentTarget.value)}
          label="Palette Name"
          required
        />
        {blocks.map(blockNum => {
          const blockProp = `block${blockNum}` as const;
          return (
            <ColorInput
              key={`block-${blockNum}`}
              label={`Block ${blockNum}`}
              value={currentPalette[blockProp]}
              onChangeEnd={val => {
                handleChange(blockProp, val);
              }}
              withPreview={false}
              rightSection={<ColorSwatch color={currentPalette[blockProp]} />}
              required
            />
          );
        })}
      </Box>
      {error ? (
        <Text c="red" mb="md" mt="lg">
          {error}
        </Text>
      ) : null}
      <Button
        fullWidth={true}
        onClick={() => handleSave()}
        disabled={!isCompletePalette(currentPalette)}
      >
        Save
      </Button>
    </Box>
  );
};
