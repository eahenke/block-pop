import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './App.css';
import { Game } from './ui/components/game/Game';
import { GameProvider } from './ui/context/game-provider';
import { theme } from './ui/theme';
import { PaletteProvider } from './ui/context/palette/palette-provider';

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <GameProvider>
        <PaletteProvider>
          <Game />
        </PaletteProvider>
      </GameProvider>
    </MantineProvider>
  );
}

export default App;
