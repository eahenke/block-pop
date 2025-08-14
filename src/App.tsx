import { MantineProvider } from '@mantine/core';
import './App.css';
import { Game } from './ui/components/game/Game';
import { GameProvider } from './ui/context/game-provider';
import { theme } from './ui/theme';

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <GameProvider>
        <Game />
      </GameProvider>
    </MantineProvider>
  );
}

export default App;
