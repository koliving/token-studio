import { createSelector } from 'reselect';
import { settingsStateSelector } from './settingsStateSelector';

export const aliasBasefontSizeelector = createSelector(
  settingsStateSelector,
  (state) => state.aliasBaseFontSize,
);
