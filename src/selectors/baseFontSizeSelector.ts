import { createSelector } from 'reselect';
import { settingsStateSelector } from './settingsStateSelector';

export const basefontSizeelector = createSelector(
  settingsStateSelector,
  (state) => state.baseFontSize,
);
