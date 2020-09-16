import { handleActions } from 'redux-actions';
import { fromJS, Map, List } from 'immutable';

import {
  SET_ENTITIES,
  SET_ENTITIES_SHALLOW,
  SET_ENTITIES_ARRAY_CONCAT,
  DELETE_ENTITIES_IN,
} from '../../entities';

const { isList } = List;

function merger(a, b) {
  if (a && a.mergeWith && !isList(a) && !isList(b)) {
    return a.mergeWith(merger, b);
  }
  return b;
}

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [SET_ENTITIES]: (state, action) => {
      if (action.payload) {
        if (action.meta && typeof Array.isArray(action.meta.path)) {
          return state.setIn(
            action.meta.path,
            state
              .getIn(action.meta.path, Map())
              .mergeWith(merger, action.payload)
          );
        }
        return state.mergeWith(merger, action.payload);
      }
      return state;
    },
    [SET_ENTITIES_SHALLOW]: (state, action) => {
      if (action.payload) {
        if (action.meta && typeof Array.isArray(action.meta.path)) {
          return state.mergeIn(action.meta.path, action.payload);
        }
        return state.merge(action.payload);
      }
      return state;
    },
    [SET_ENTITIES_ARRAY_CONCAT]: (state, action) => {
      if (action.payload) {
        if (action.meta && typeof Array.isArray(action.meta.path)) {
          return state.setIn(
            action.meta.path,
            state.getIn(action.meta.path, Map()).mergeDeep(action.payload)
          );
        }
        return state.mergeDeep(action.payload);
      }
      return state;
    },
    [DELETE_ENTITIES_IN]: (state, action) => {
      if (action.payload) {
        return state.deleteIn(action.payload);
      }
      return state;
    },
  },
  fromJS({})
);
