import './App.css';
import { Game } from './ui/components/game/Game';
import { GameProvider } from './ui/context/game-provider';

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
