import { Box, Text } from '@mantine/core';
import { useGame } from '../../hooks/use-game';
import './board.css';

export const Board = () => {
  const { game, removeBlock } = useGame();

  const board = game.board;

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
                className={`tile tile-${val}`}
                key={`${cIdx},${rIdx}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <Box mt="lg">
        <Text ta="center">Current seed: {game.seed}</Text>
      </Box>
    </div>
  );
};
