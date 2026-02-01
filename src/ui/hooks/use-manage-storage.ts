import { deleteAllSeedInfo } from '../../storage';
import { deleteAllPalettes } from '../../storage/palette';

export const useManageStorage = () => {
  const deleteGameData = async () => {
    await Promise.all([deleteAllSeedInfo(), deleteAllPalettes()]);
  };

  return {
    deleteGameData,
  };
};
