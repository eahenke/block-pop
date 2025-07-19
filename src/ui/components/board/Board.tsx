import './board.css';
import { useGame } from '../../context/game-context';

export const Board = () => {
  const { game, remove } = useGame();

  const board = game.board;

  const onClick = (row: number, col: number) => {
    remove(row, col);
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, rIdx) => (
          <div className="board-row" key={rIdx}>
            {row.map((val, cIdx) => (
              <div
                onClick={() => onClick(rIdx, cIdx)}
                className={`tile tile-${val}`}
                key={`${rIdx},${cIdx}`}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
