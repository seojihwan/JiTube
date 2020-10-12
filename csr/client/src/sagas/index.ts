import { call, fork, put, take, race, select } from 'redux-saga/effects';
import { action, getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis';
import { IStoreState } from '../store';

function* authenticationWorkflow() {
  try {
    const {
      data: { user_id, email, token, name },
    } = yield call(Api.requestAuth);
    if (token) {
      yield put(Actions.successAuth({ user_id, email, token, name }));
    }
  } catch (error) {}
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

function* getAllVideos() {
  const {
    data: { videos },
  } = yield call(Api.requestGetAllVideos);
  yield put(Actions.successGetAllVideos(videos));
}

function* getOneVideos() {
  const { payload } = yield take(getType(Actions.requestGetOneVideo));
  const {
    data: { video },
  } = yield call(Api.requestGetOneVideo, payload);
  yield put(Actions.successGetOneVideo(video));
}

function* likeVideos() {
  while (true) {
    const {
      payload: { user_id, video_id, like },
    } = yield take(getType(Actions.requestLikeVideo));
    yield call(Api.requestLikeVideo, { user_id, video_id, like });
  }
}

function* comment() {
  while (true) {
    const {
      payload: { username, contents, video_id, comment_id },
    } = yield take(getType(Actions.requestComment));
    yield call(Api.requestComment, {
      username,
      contents,
      video_id,
      comment_id,
    });

    const {
      data: { video },
    } = yield call(Api.requestGetOneVideo, video_id);
    yield put(Actions.successGetOneVideo(video));
  }
}

function* deletecomment() {
  while (true) {
    const {
      payload: { comment_id },
    } = yield take(getType(Actions.requestDeleteComment));
    yield call(Api.requestDeleteComment, comment_id);
  }
}
export default function* () {
  yield fork(authenticationWorkflow);
  yield fork(videoUpload);
  yield fork(getAllVideos);
  yield fork(likeVideos);
  yield fork(comment);
  yield fork(getOneVideos);

  // yield fork(deletecomment);
}
