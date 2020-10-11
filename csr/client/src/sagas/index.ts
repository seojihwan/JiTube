import { call, fork, put, take, race, select } from 'redux-saga/effects';
import { action, getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis';
import { IStoreState } from '../store';
const getCookie = (name: string) => {
  function escape(s: string) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  }
  var match = document.cookie.match(
    RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)')
  );
  return match ? match[1] : '';
};

function* authenticationWorkflow() {
  if (document.cookie) {
    const [user_id, email, token] = [
      getCookie('user_id'),
      getCookie('email'),
      getCookie('token'),
    ];
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
function* getVideos() {
  const {
    data: { videos },
  } = yield call(Api.requestGetAllVideos);
  console.log('allvideos', videos);
  yield put(Actions.successGetAllVideos(videos));
}
function* likeVideos() {
  while (true) {
    const {
      payload: { user_id, video_id, like },
    } = yield take(getType(Actions.requestLikeVideo));
    yield call(Api.requestLikeVideo, { user_id, video_id, like });
  }
}
export default function* () {
  yield fork(authenticationWorkflow);
  yield fork(videoUpload);
  yield fork(getVideos);
  yield fork(likeVideos);
}
