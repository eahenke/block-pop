import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './App.css';
import { Game } from './ui/components/game/Game';
import { GameProvider } from './ui/context/game-provider';
import { theme } from './ui/theme';
import { PaletteProvider } from './ui/context/palette/palette-provider';
import { useDbMigration } from './ui/hooks/use-db-migration';
import { Loading } from './ui/components/common';
import { SettingsMenuProvider } from './ui/context/settings-menu';

function App() {
  const { loading } = useDbMigration();

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <GameProvider>
        <PaletteProvider>
          <SettingsMenuProvider>
            {loading ? (
              <Loading visible message="Migrating data..." />
            ) : (
              <Game />
            )}
          </SettingsMenuProvider>
        </PaletteProvider>
      </GameProvider>
    </MantineProvider>
  );
}

export default App;
