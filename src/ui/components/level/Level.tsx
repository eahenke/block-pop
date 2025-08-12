import { useGame } from '../../hooks/use-game';
import { useHighScore } from '../../hooks/use-high-score';
import './level.css';

export const Level = () => {
  const {
    game: { seed, level },
  } = useGame();
  const { getHighScore } = useHighScore();

  return (
    <div className="level">
      <span>Level: {level.level}</span>
      <span>Goal: {level.goal}</span>
      <span>High score: {getHighScore(seed, level.level) || 0}</span>
    </div>
  );
};
