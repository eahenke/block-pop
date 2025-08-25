import { getHighScore } from '../../../game/high-score';
import { useGame } from '../../hooks/use-game';
import './level.css';

export const Level = () => {
  const { game } = useGame();

  const { level, mode } = game;
  const highScore = getHighScore(game);

  return (
    <div className="level">
      {mode === 'ENDLESS' ? (
        <>
          <span>Level: {level.level}</span>
          <span>Goal: {level.goal}</span>
        </>
      ) : null}
      <span>High score: {highScore?.score || 0}</span>
      {/* TODO: clean up if no attempt */}
      <span>on attempt: {highScore?.attempt || 0}</span>
    </div>
  );
};
