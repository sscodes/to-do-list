import { themeConstants } from '../actions/constants';

const inistate = {
  theme: localStorage.getItem('theme') || 'LIGHT',
};

const themeReducer = (state = inistate, action) => {
  switch (action.type) {
    case themeConstants.LIGHT_THEME:
      return {
        ...state,
        theme: 'LIGHT',
      };
    case themeConstants.DARK_THEME:
      return {
        ...state,
        theme: 'DARK',
      };
    default:
      return state;
  }
};

export default themeReducer;
