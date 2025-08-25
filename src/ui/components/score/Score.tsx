import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../hooks/use-game';
import type { GameType } from '../../../game/types';
import './score.css';
import { getHighScore } from '../../../game/high-score';
import { Group } from '@mantine/core';

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
  const { score, lastMove } = game;

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

  return (
    <div>
      <Group justify="space-around">
        <span>Attempt: {game.seedInfo.attempts}</span>
        <span className={scoreClass}>Score: {score}</span>
      </Group>
      <div style={{ height: '1.5rem' }}>
        {showMove && lastMove ? (
          <span>
            {lastMove.blocks} blocks! {lastMove.score} points!
          </span>
        ) : null}
      </div>
    </div>
  );
};
