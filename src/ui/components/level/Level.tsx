import { useGame } from '../../hooks/use-game';
import { useHighScore } from '../../hooks/use-high-score';
import './level.css';

export const Level = () => {
  const {
    game: { seed, level, mode },
  } = useGame();
  const { getHighScore } = useHighScore();

  return (
    <div className="level">
      {mode === 'ENDLESS' ? (
        <>
          <span>Level: {level.level}</span>
          <span>Goal: {level.goal}</span>
        </>
      ) : null}
      <span>High score: {getHighScore(seed, level.level) || 0}</span>
    </div>
  );
};
