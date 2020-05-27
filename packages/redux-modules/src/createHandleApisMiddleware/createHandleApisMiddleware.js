import {
  egApiTake,
  egApiRequest,
  egApiCancel,
  egApiSuccess,
  egApiFailure
} from '../apis/actions';
import { camalize, getApiInfos, trimLeafs, findFetchIndex } from '../utils';

/**
 * Use to dispatch fetch actions automatically.
 */
function createHandleApisMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const isObject = typeof action === 'object' && !Array.isArray(action);
    if (isObject) {
      if (
        action.type &&
        typeof action.type === 'string' &&
        action.type.indexOf('FETCH') !== -1
      ) {
        const leafs = camalize(action.type).split('/');
        const fetchIndex = findFetchIndex(leafs);
        const [, apiType] = getApiInfos(leafs[fetchIndex]);
        const trimedLeafs = trimLeafs(leafs, fetchIndex);
        if (!apiType) {
          dispatch(egApiTake({ leafs: trimedLeafs }));
        }
        if (apiType === 'request') {
          dispatch(egApiRequest({ leafs: trimedLeafs }));
        }
        if (apiType === 'cancel') {
          dispatch(egApiCancel({ leafs: trimedLeafs }));
        }
        if (apiType === 'success') {
          dispatch(
            egApiSuccess({
              leafs: trimedLeafs,
              response: action.payload
            })
          );
        }
        if (apiType === 'failure') {
          dispatch(
            egApiFailure({
              leafs: trimedLeafs,
              error: action.payload
            })
          );
        }
      }
    }
    return next(action);
  };
}

export default createHandleApisMiddleware;
