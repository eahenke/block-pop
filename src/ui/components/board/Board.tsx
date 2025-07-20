import './board.css';
import { useGame } from '../../context/game-context';

export const Board = () => {
  const { game, remove, update } = useGame();

  const board = game.board;

  const onClick = (row: number, col: number) => {
    remove(row, col);
    setTimeout(() => {
      update();
    }, 100);
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((col, cIdx) => (
          <div className="board-col" key={cIdx}>
            {col.map((val, rIdx) => (
              <div
                onClick={() => onClick(cIdx, rIdx)}
                className={`tile tile-${val}`}
                key={`${cIdx},${rIdx}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
