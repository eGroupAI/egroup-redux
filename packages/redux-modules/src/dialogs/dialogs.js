import { handleActions } from 'redux-actions';
import produce from 'immer';
import merge from 'lodash.merge';
import warning from 'warning';
import { supportedTypes, hasIn, setIn } from '../utils';

import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA
} from './types';

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [INITIALIZE_DIALOG]: produce((draft, action) => {
      if (!action.payload) return;
      const [isSupported, type] = supportedTypes(action.payload, ['string']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "initializeDialog" is not supported "${type}" payload.`
        );
        return;
      }
      setIn(draft, [action.payload, 'isOpen'], false);
    }),
    [OPEN_DIALOG]: produce((draft, action) => {
      if (!action.payload) return;
      const [isSupported, type] = supportedTypes(action.payload, ['string']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "openDialog" is not supported "${type}" payload.`
        );
        return;
      }
      setIn(draft, [action.payload, 'isOpen'], true);
    }),
    [CLOSE_DIALOG]: produce((draft, action) => {
      if (!action.payload) return;
      const [isSupported, type] = supportedTypes(action.payload, ['string']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "closeDialog" is not supported "${type}" payload.`
        );
        return;
      }
      setIn(draft, [action.payload, 'isOpen'], false);
    }),
    [SET_DIALOG_DATA]: produce((draft, action) => {
      if (!action.payload) return;
      const [isSupported, type] = supportedTypes(action.payload, ['object']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "setDialogData" is not supported "${type}" payload.`
        );
        return;
      }
      const { name, ...other } = action.payload;
      if (hasIn(draft, [name])) {
        merge(draft[name], other);
      } else {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: dialog "${name}" is not exist.`
        );
      }
    })
  },
  {}
);
