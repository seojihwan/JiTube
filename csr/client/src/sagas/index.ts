import { call, fork, put, take, race, select } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis';
import { IStoreState } from '../store';
function* authenticationWorkflow() {
  if (document.cookie) {
    const {
      data: { user_id, email, token },
    } = yield call(Api.requestAuth);
    yield put(Actions.successAuth({ user_id, email, token }));
  }
  while (true) {
    let auth = yield select((state: IStoreState) => state.authentication);
    while (!auth) {
      try {
        const {
          login,
          signup,
        }: {
          login: { payload: Actions.IRequsetLoginPayload };
          signup: { payload: Actions.IRequsetSignUpPayload };
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
          yield call(Api.requestSignUp, email, password, name);
        }
        const { data } = yield call(Api.requestLogin, email, password);

        yield put(Actions.successLogin(data));
        auth = true;
      } catch (error) {
        console.log(error);
        break;
      }
    }
    yield take(Actions.requestLogout);
    yield put(Actions.successLogout());
  }
}

function* videoUpload() {
  while (true) {
    const { payload: formData } = yield take(
      getType(Actions.requestVideoUpload)
    );
    yield call(Api.requestVideoUpload, formData);
  }
}
export default function* () {
  yield fork(authenticationWorkflow);
  yield fork(videoUpload);
}
