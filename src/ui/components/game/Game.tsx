import { useState } from 'react';
import { MdOutlineSettings, MdOutlinePalette } from 'react-icons/md';
import { useMantineColorScheme } from '@mantine/core';
import { Board } from '../board';
import { Level } from '../level';
import { Score } from '../score';
import { Settings } from '../settings';
import './game.css';
import { ActionIcon } from '@mantine/core';
import { GameOver } from '../game-over';
import { useHighScore } from '../../hooks/use-high-score';

export const Game = () => {
  useHighScore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    const nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(nextScheme);
  };

  return (
    <div>
      <div className="game">
        <section className="control-area">
          <ActionIcon
            color="text"
            variant="transparent"
            onClick={toggleColorScheme}
            aria-label="Theme"
          >
            <MdOutlinePalette size={24} />
          </ActionIcon>
          <ActionIcon
            color="text"
            variant="transparent"
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
          >
            <MdOutlineSettings size={24} />
          </ActionIcon>
        </section>
        <section className="level-area">
          <Level />
        </section>
        <section className="score-area">
          <Score />
        </section>
        <section className="board-area">
          <Board />
        </section>
      </div>
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <GameOver />
    </div>
  );
};
