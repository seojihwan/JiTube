import { sign } from 'jsonwebtoken';
import { call, fork, put, take, race } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis';
function* authenticationWorkflow() {
  while (true) {
    try {
      const {
        login,
        signup,
      }: {
        login: { payload: Actions.IrequsetLoginPayload };
        signup: { payload: Actions.IrequsetSignUpPayload };
      } = yield race({
        login: take(getType(Actions.requestLogin)),
        signup: take(getType(Actions.requestSignUp)),
      });

      const {
        payload: { email, password },
      } = login || signup;

      if (signup) {
        const {
          payload: { name },
        } = signup;
        yield call(Api.requsetSignUp, email, password, name);
      }

      const { data } = yield call(Api.requsetLogin, email, password);
      yield put(Actions.successLogin(data));
      break;
    } catch (error) {
      console.log(error);
    }
  }
}

export default function* () {
  yield fork(authenticationWorkflow);
}
