import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../hooks/use-game';
import type { GameType } from '../../../game/types';
import './score.css';
import { getHighScore } from '../../../game/high-score';
import { bonusScore } from '../../../game/score';
import { TOTAL_BLOCKS } from '../../../game/constants';
import { Text } from '@mantine/core';

const SCORE_NOTICE_DURATION = 1000;
const SCORE_SUCCESS_CLASS = 'score-success';

const getScoreClass = (game: GameType, highScore: number) => {
  const comparisonScore = game.mode === 'ENDLESS' ? game.level.goal : highScore;
  return game.score > comparisonScore ? SCORE_SUCCESS_CLASS : '';
};

export const Score = () => {
  const [showMove, setShowMoved] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { game } = useGame();
  const { score, lastMove, status } = game;

  useEffect(() => {
    if (!lastMove?.blocks || !lastMove?.score) {
      return;
    }

    setShowMoved(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowMoved(false);
    }, SCORE_NOTICE_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [lastMove, score]);

  const highScore = getHighScore(game);
  const scoreClass = getScoreClass(game, highScore?.score || 0);
  const blocksRemaining = TOTAL_BLOCKS - game.level.blocks;
  const bonus = bonusScore(blocksRemaining);
  const blockPlural = blocksRemaining === 1 ? 'block' : 'blocks';

  return (
    <div>
      <p className={scoreClass}>Score: {score}</p>
      <div style={{ height: '1.5rem' }}>
        {showMove && lastMove ? (
          <Text>
            {lastMove.blocks} blocks! {lastMove.score} points!
          </Text>
        ) : null}
        {status === 'DONE' && bonus ? (
          <Text className="score-bonus">
            {blocksRemaining} {blockPlural} remaining! {bonus} points!
          </Text>
        ) : null}
      </div>
    </div>
  );
};
