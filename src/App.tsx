import './App.css';
import { Game } from './ui/components/game/Game';
import { GameProvider } from './ui/context/game-context';

function App() {
  return (
    <div>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
