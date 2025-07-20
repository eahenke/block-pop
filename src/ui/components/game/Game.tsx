import { Board } from '../board';
import { Score } from '../score';
import './game.css';

export const Game = () => {
  return (
    <div className="game">
      <section className="level-area">Level</section>
      <section className="score-area">
        <Score />
      </section>
      <section className="board-area">
        <Board />
      </section>
    </div>
  );
};
