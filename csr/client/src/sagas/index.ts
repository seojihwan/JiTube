import { call, fork, put, take } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis';
function* authenticationWorkflow() {
  while (true) {
    try {
      const {
        payload: { email, password },
      } = yield take(getType(Actions.requestLogin));
      const { data } = yield call(Api.requsetLogin, email, password);
      yield put(Actions.successLogin({ ...data }));
      break;
    } catch (error) {
      console.log(error);
    }
  }
}

export default function* () {
  yield fork(authenticationWorkflow);
}
