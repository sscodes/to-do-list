import { themeConstants } from './constants';

export const themeActions = (theme) => (dispatch) => {
  if (theme === 'LIGHT') {
    localStorage.setItem('theme', 'LIGHT');
    dispatch({
      type: themeConstants.LIGHT_THEME,
      payload: theme,
    });
  } else {
    localStorage.setItem('theme', 'DARK');
    dispatch({
      type: themeConstants.DARK_THEME,
      payload: theme,
    });
  }
};
