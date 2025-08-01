import { useMemo, useState } from 'react';
import { Button, Text, TextInput } from '@mantine/core';
import { MdFileUpload, MdSave } from 'react-icons/md';

import { useGame } from '../../hooks/use-game';
import { useSavedSeeds } from '../../hooks/use-saved-seeds';
import './settings.css';
import { Menu, Modal } from '../common';

type SettingsProps = {
  open: boolean;
  onClose: () => void;
};

type SettingsSections = 'settings' | 'save' | 'load';

const SaveSeed = ({ seed, onDone }: { seed: string; onDone: () => void }) => {
  const { saveSeed } = useSavedSeeds();
  const [error, setError] = useState('');
  const [seedName, setSeedName] = useState('');

  const handleSave = () => {
    setError('');
    try {
      saveSeed({ name: seedName, seed });
      onDone();
    } catch {
      setError('Error saving seed');
    }
  };

  return (
    <div>
      <TextInput
        value={seedName}
        onChange={e => setSeedName(e.currentTarget.value)}
        label="Name"
        className="seed-name-input"
      />
      {error ? <span>{error}</span> : null}
      <Button fullWidth={true} onClick={() => handleSave()}>
        Save
      </Button>
    </div>
  );
};

const LoadSeed = ({ onDone }: { onDone: () => void }) => {
  const { getSavedSeeds } = useSavedSeeds();
  const [error, setError] = useState('');
  const { init } = useGame();

  const seeds = useMemo(() => {
    return getSavedSeeds();
  }, []);

  const handleLoad = (seed: string) => {
    setError('');
    try {
      init(seed, true);
      onDone();
    } catch {
      setError('Error loading seed');
    }
  };

  const items = seeds.map(savedSeed => ({
    title: `${savedSeed.name}: ${savedSeed.seed}`,
    onClick: () => handleLoad(savedSeed.seed),
    size: 'lg' as const,
  }));

  return (
    <div>
      <Menu items={items} />
      {error ? <span>{error}</span> : null}
    </div>
  );
};

export const Settings = ({ open, onClose }: SettingsProps) => {
  const { game } = useGame();
  const [section, setSection] = useState<SettingsSections>('settings');

  const toMainSettings = () => {
    setSection('settings');
  };

  const handleClose = () => {
    toMainSettings();
    onClose();
  };

  return (
    <Modal
      title="Settings"
      opened={open}
      onClose={handleClose}
      onBack={section === 'settings' ? undefined : toMainSettings}
    >
      <div>
        <Text variant="text" ta="center">
          Current seed: {game.seed}
        </Text>
      </div>
      {section === 'settings' ? (
        <Menu
          items={[
            {
              title: 'Save Seed',
              icon: <MdSave size={24} />,
              onClick: () => setSection('save'),
            },
            {
              title: 'Load Seed',
              icon: <MdFileUpload size={24} />,
              onClick: () => setSection('load'),
            },
          ]}
        />
      ) : null}
      {section === 'load' ? <LoadSeed onDone={onClose} /> : null}
      {section === 'save' ? (
        <SaveSeed seed={game.seed} onDone={toMainSettings} />
      ) : null}
    </Modal>
  );
};
