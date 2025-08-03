import { useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import { Board } from '../board';
import { Level } from '../level';
import { Score } from '../score';
import { Settings } from '../settings';
import './game.css';
import { ActionIcon } from '@mantine/core';
import { GameOver } from '../game-over';

export const Game = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div>
      <div className="game">
        <section className="level-area">
          <Level />
          <ActionIcon
            variant="transparent"
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
          >
            <MdOutlineSettings color="black" size={24} />
          </ActionIcon>
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
