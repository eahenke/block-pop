import type { IconType } from 'react-icons';
import {
  MdOutlineCloud,
  MdOutlineEco,
  MdOutlineFavoriteBorder,
  MdOutlineNightlight,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { Group } from '@mantine/core';
import cx from 'classnames';
import { useGame } from '../../hooks/use-game';
import './board.css';
import { Seed } from '../seed';
import { getNextMove, isSameCoord } from '../../../game';

const BLOCK_ICONS: Record<number, IconType> = {
  1: MdOutlineStarBorder,
  2: MdOutlineEco,
  3: MdOutlineNightlight,
  4: MdOutlineCloud,
  5: MdOutlineFavoriteBorder,
};

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
            {col.map((val, rIdx) => {
              const Icon = BLOCK_ICONS[val];

              return (
                <div
                  onClick={() => onClick(cIdx, rIdx)}
                  className={cx(`tile tile-${val}`, {
                    'next-move':
                      game.viewOptions.hint &&
                      nextMove &&
                      isSameCoord(nextMove, [cIdx, rIdx]),
                  })}
                  key={`${cIdx},${rIdx}`}
                >
                  {Icon ? (
                    <Icon
                      className={cx(`block-icon block-icon-${val}`, {
                        invisible: !game.viewOptions.colorblind,
                      })}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <Group mt="lg" justify="center">
        <Seed seed={game.seed} />
      </Group>
    </div>
  );
};
