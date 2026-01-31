import {
  MdOutlineSettings,
  MdOutlineHighlight,
  MdOutlineAccessibility,
  MdRefresh,
  MdOutlineNightlight,
  MdOutlineWbSunny,
} from 'react-icons/md';
import { useMantineColorScheme } from '@mantine/core';
import { Board } from '../board';
import { Level } from '../level';
import { Score } from '../score';
import './game.css';
import { ActionIcon } from '@mantine/core';
import { GameOver, GameOverBanner } from '../game-over';
import { useGame } from '../../hooks/use-game';
import type { ViewOptions } from '../../../game/types';
import { useSaveSeedHistory } from '../../hooks/use-seed-history';
import { useSettingsMenu } from '../../hooks/use-settings-menu';
import { SettingsMenu } from '../settings-menu';
import { SETTINGS_SECTIONS } from '../../context/settings-menu';

export const Game = () => {
  useSaveSeedHistory();
  const { open } = useSettingsMenu();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const { setViewOptions, game, restart } = useGame();

  const toggleColorScheme = () => {
    const nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(nextScheme);
  };

  const toggleViewOption = (option: keyof ViewOptions) => () => {
    setViewOptions({ [option]: !game.viewOptions[option] });
  };

  return (
    <div>
      <div className="game">
        <section className="control-area">
          <ActionIcon
            color="text"
            variant="transparent"
            onClick={restart}
            aria-label="Restart"
          >
            <MdRefresh size={24} />
          </ActionIcon>
          <ActionIcon
            color={game.viewOptions.colorblind ? '' : 'text'}
            variant="transparent"
            onClick={toggleViewOption('colorblind')}
            aria-label="Accessibility"
          >
            <MdOutlineAccessibility size={24} />
          </ActionIcon>
          <ActionIcon
            color={game.viewOptions.hint ? '' : 'text'}
            variant="transparent"
            onClick={toggleViewOption('hint')}
            aria-label="Hint"
          >
            <MdOutlineHighlight size={24} />
          </ActionIcon>
          <ActionIcon
            color="text"
            variant="transparent"
            onClick={toggleColorScheme}
            aria-label="Theme"
          >
            {colorScheme === 'light' ? (
              <MdOutlineNightlight size={24} />
            ) : (
              <MdOutlineWbSunny size={24} />
            )}
          </ActionIcon>
          <ActionIcon
            color="text"
            variant="transparent"
            onClick={() => open(SETTINGS_SECTIONS.SETTINGS)}
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
          <GameOverBanner />
          <Board />
        </section>
      </div>
      <SettingsMenu />
      <GameOver />
    </div>
  );
};
