import { call, fork, put, take, race, select } from 'redux-saga/effects';
import { action, getType } from 'typesafe-actions';
import { VideoDocument } from '../../../server/models';
import * as Actions from '../actions';
import * as Api from '../apis';
import { IStoreState } from '../store';

function* authenticationWorkflow() {
  try {
    const {
      data: { user_id, email, token, name, imageUrl },
    } = yield call(Api.requestAuth);
    if (token) {
      yield put(Actions.successAuth({ user_id, email, token, name, imageUrl }));
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
      }
    }
    yield take(getType(Actions.requestLogout));
    yield call(Api.requestLogout);
    yield put(Actions.successLogout());
  }
}

function* videoUpload() {
  while (true) {
    const { payload: formData } = yield take(
      getType(Actions.requestVideoUpload)
    );
    try {
      yield call(Api.requestVideoUpload, formData);
    } catch (error) {
      console.log(error);
    }
  }
}

function* getAllVideos() {
  while (true) {
    yield take(getType(Actions.requestGetAllVideos));
    const {
      data: { videos },
    } = yield call(Api.requestGetAllVideos);
    yield put(Actions.successGetAllVideos(videos));
  }
}

function* upVideoViewCount() {
  while (true) {
    const { payload } = yield take(getType(Actions.requestUpVideoViewCount));
    yield call(Api.requestUpVideoViewCount, payload);
  }
}

function* getOneVideo() {
  while (true) {
    const { payload } = yield take(getType(Actions.requestGetOneVideo));
    const {
      data: { video },
    } = yield call(Api.requestGetOneVideo, payload);
    yield put(Actions.successGetOneVideo(video));
  }
}

function* getUserAllVideos() {
  while (true) {
    const { payload } = yield take(getType(Actions.requestGetUserAllVideos));
    const {
      data: { videos },
    }: { data: { videos: VideoDocument[] } } = yield call(
      Api.requestGetUserAllVideos,
      payload
    );
    yield put(Actions.successGetUserAllVideos(videos));
    const popularTopTenVideos = [...videos]
      .sort((a, b) => b.viewcount - a.viewcount)
      .slice(0, 10);
    yield put(Actions.successGetUserPopularTopTenVideos(popularTopTenVideos));
  }
}

function* likeVideos() {
  while (true) {
    const {
      payload: { user_id, video_id, like },
    } = yield take(getType(Actions.requestLikeVideo));
    yield call(Api.requestLikeVideo, { user_id, video_id, like });
    const {
      data: { video },
    } = yield call(Api.requestGetOneVideo, video_id);
    yield put(Actions.successGetOneVideo(video));
  }
}

function* comment() {
  while (true) {
    const {
      payload: { user_id, contents, video_id, comment_id },
    } = yield take(getType(Actions.requestComment));
    yield call(Api.requestComment, {
      user_id,
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
      payload: { video_id, comment_id, parrentComment_id },
    } = yield take(getType(Actions.requestDeleteComment));
    yield call(Api.requestDeleteComment, {
      video_id,
      comment_id,
      parrentComment_id,
    });
    const {
      data: { video },
    } = yield call(Api.requestGetOneVideo, video_id);
    yield put(Actions.successGetOneVideo(video));
  }
}

function* deletevideo() {
  while (true) {
    const {
      payload: { user_id, video_id },
    } = yield take(getType(Actions.requestDeleteVideo));
    console.log(user_id, video_id);
    yield call(Api.requestDeleteVideo, video_id);
    const {
      data: { videos },
    } = yield call(Api.requestGetUserAllVideos, user_id);
    yield put(Actions.successGetUserAllVideos(videos));
  }
}

export default function* () {
  yield fork(authenticationWorkflow);
  yield fork(videoUpload);
  yield fork(getAllVideos);
  yield fork(likeVideos);
  yield fork(comment);
  yield fork(getOneVideo);
  yield fork(getUserAllVideos);
  yield fork(deletecomment);
  yield fork(deletevideo);
  yield fork(upVideoViewCount);
}
