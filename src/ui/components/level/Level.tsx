import { useGame } from '../../hooks/use-game';
import './level.css';

export const Level = () => {
  const {
    game: { level, mode, highScore },
  } = useGame();

  return (
    <div className="level">
      {mode === 'ENDLESS' ? (
        <>
          <span>Level: {level.level}</span>
          <span>Goal: {level.goal}</span>
        </>
      ) : null}
      <span>High score: {highScore || 0}</span>
    </div>
  );
};
