import { createAction, handleActions } from 'redux-actions';
import { Map, isImmutable } from 'immutable';

/**
 * Types
 */
export const INITIALIZE_SNACKBAR = 'INITIALIZE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const SET_SNACKBAR_DATA = 'SET_SNACKBAR_DATA';

/**
 * Actions
 */
export const initializeSnackbar = createAction(INITIALIZE_SNACKBAR);
export const openSnackbar = createAction(OPEN_SNACKBAR);
export const closeSnackbar = createAction(CLOSE_SNACKBAR);
export const setSnackbarData = createAction(SET_SNACKBAR_DATA);

/**
 * Selectors
 */
export const getSnackbarStates = (state, props, name) =>
  state.getIn(['snackbars', name], Map());

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [INITIALIZE_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.update(action.payload, snackbarState => {
          if (isImmutable(snackbarState)) {
            return snackbarState;
          }
          return Map({
            isOpen: false
          });
        });
      }
      return state;
    },
    [OPEN_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], true);
      }
      return state;
    },
    [CLOSE_SNACKBAR]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], false);
      }
      return state;
    },
    [SET_SNACKBAR_DATA]: (state, action) => {
      if (action.payload) {
        const { name, ...other } = action.payload;
        return state.update(name, el => el.merge(other));
      }
      return state;
    }
  },
  Map()
);