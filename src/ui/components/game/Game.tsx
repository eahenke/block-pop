import { Board } from '../board';
import { Score } from '../score';
import './game.css';

export const Game = () => {
  return (
    <div className="game">
      <Score />
      <Board />
    </div>
  );
};
