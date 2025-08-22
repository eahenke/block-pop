import { Group } from '@mantine/core';
import cx from 'classnames';
import { useGame } from '../../hooks/use-game';
import './board.css';
import { Seed } from '../seed';
import { getNextMove, isSameCoord } from '../../../game';

export const Board = () => {
  const { game, removeBlock } = useGame();

  const board = game.board;
  const nextMove = getNextMove(game);

  const onClick = (col: number, row: number) => {
    removeBlock(col, row);
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((col, cIdx) => (
          <div className="board-col" key={cIdx}>
            {col.map((val, rIdx) => (
              <div
                onClick={() => onClick(cIdx, rIdx)}
                className={cx(`tile tile-${val}`, {
                  'next-move':
                    game.viewOptions.hint &&
                    nextMove &&
                    isSameCoord(nextMove, [cIdx, rIdx]),
                })}
                key={`${cIdx},${rIdx}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <Group mt="lg" justify="center">
        <Seed seed={game.seed} />
      </Group>
    </div>
  );
};
