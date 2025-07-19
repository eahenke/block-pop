import './board.css';
import { useGame } from '../../context/game-context';

export const Board = () => {
  const { game } = useGame();

  const board = game.board;

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, rIdx) => (
          <div className="board-row" key={rIdx}>
            {row.map((val, cIdx) => (
              <div className={`tile tile-${val}`} key={`${rIdx},${cIdx}`}>
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
