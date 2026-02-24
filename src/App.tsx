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
import { useLogsTtl } from './ui/hooks/use-logs-ttl';
import { LOG_RETENTION_DAYS } from './config/environment';
import { ErrorBoundary } from './ui/components/error-boundary';

function App() {
  useLogsTtl(LOG_RETENTION_DAYS);
  const { loading } = useDbMigration();

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ErrorBoundary>
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
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default App;
