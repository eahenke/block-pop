import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../hooks/use-game';

const SCORE_NOTICE_DURATION = 1000;

export const Score = () => {
  const {
    game: { score, lastMove },
  } = useGame();
  const [showMove, setShowMoved] = useState(false);
  const timerRef = useRef<number | null>(null);

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

  return (
    <div>
      <p>Score: {score}</p>
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
