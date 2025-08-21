import { useCallback, useMemo, useState } from 'react';
import { Box, Button, Group, Text, TextInput } from '@mantine/core';
import { MdFileUpload, MdRefresh, MdSave, MdEdit } from 'react-icons/md';

import { useGame } from '../../hooks/use-game';
import { useSavedSeeds } from '../../hooks/use-saved-seeds';
import { Menu, Modal } from '../common';
import { generateSeed } from '../../../game/seed';
import { useBackButton, usePushState } from '../../hooks/use-back-button';
import { Seed } from '../seed';
import { notifications } from '@mantine/notifications';

type SettingsProps = {
  open: boolean;
  onClose: () => void;
};

type SettingsSections = 'settings' | 'save' | 'load' | 'new' | 'enter';

const SaveSeed = ({ seed, onDone }: { seed: string; onDone: () => void }) => {
  const { saveSeed } = useSavedSeeds();
  const [error, setError] = useState('');
  const [seedName, setSeedName] = useState('');
  usePushState();

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
    <Box mt="sm">
      <Box mb="sm">
        <TextInput
          value={seedName}
          onChange={e => setSeedName(e.currentTarget.value)}
          label="Name"
        />

        {error ? <span>{error}</span> : null}
      </Box>
      <Button fullWidth={true} onClick={() => handleSave()}>
        Save
      </Button>
    </Box>
  );
};

const LoadSeed = ({ onDone }: { onDone: () => void }) => {
  const { getSavedSeeds } = useSavedSeeds();
  const [error, setError] = useState('');
  const { init } = useGame();
  usePushState();

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
    <Box mt="md">
      <Menu items={items} />
      {error ? <span>{error}</span> : null}
    </Box>
  );
};

const NewSeed = ({ onDone }: { onDone: () => void }) => {
  const { init } = useGame();
  usePushState();

  const seed = generateSeed();

  const handleNewSeed = () => {
    init(seed, true);
    onDone();
  };

  return (
    <>
      <Box mb="sm" mt="sm">
        <Text>
          This will start a new game with seed <Text fw={700}>{seed}</Text>
        </Text>
      </Box>
      <Button fullWidth={true} onClick={handleNewSeed}>
        Okay
      </Button>
    </>
  );
};

const EnterSeed = ({ onDone }: { onDone: () => void }) => {
  const { init } = useGame();
  const [error, setError] = useState('');
  const [seedValue, setSeedValue] = useState('');
  usePushState();

  const handleEnterSeed = () => {
    setError('');
    try {
      init(seedValue, true);
      //   saveSeed({ name: seedName, seed });
      onDone();
    } catch {
      setError('Error entering seed');
      notifications.show({
        message: 'Failed to enter seed',
      });
    }
  };

  return (
    <Box mt="sm">
      <Box mb="sm">
        <TextInput
          value={seedValue}
          onChange={e => setSeedValue(e.currentTarget.value)}
          label="Seed"
        />

        {error ? <span>{error}</span> : null}
      </Box>
      <Button fullWidth={true} onClick={() => handleEnterSeed()}>
        Start
      </Button>
    </Box>
  );
};

export const Settings = ({ open, onClose }: SettingsProps) => {
  const { game } = useGame();
  const [section, setSection] = useState<SettingsSections>('settings');
  usePushState();

  const toMainSettings = () => {
    setSection('settings');
  };

  const handleBack = useCallback(() => {
    if (section === 'settings') {
      onClose();
    } else {
      toMainSettings();
    }

    return;
  }, [section]);
  useBackButton(handleBack);

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
      <Group justify="center">
        <Seed seed={game.seed} />
      </Group>
      {section === 'settings' ? (
        <Box mt="md">
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
              {
                title: 'New Seed',
                icon: <MdRefresh size={24} />,
                onClick: () => setSection('new'),
              },
              {
                title: 'Enter Seed',
                icon: <MdEdit size={24} />,
                onClick: () => setSection('enter'),
              },
            ]}
          />
        </Box>
      ) : null}
      {section === 'load' ? <LoadSeed onDone={handleClose} /> : null}
      {section === 'save' ? (
        <SaveSeed seed={game.seed} onDone={toMainSettings} />
      ) : null}
      {section === 'new' ? <NewSeed onDone={handleClose} /> : null}
      {section === 'enter' ? <EnterSeed onDone={handleClose} /> : null}
    </Modal>
  );
};
