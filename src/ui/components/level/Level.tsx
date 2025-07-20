import { useGame } from '../../hooks/use-game';
import './level.css';

export const Level = () => {
  const {
    game: { level },
  } = useGame();

  return (
    <div className="level">
      <span>Level: {level.level}</span>
      <span>Goal: {level.goal}</span>
    </div>
  );
};
