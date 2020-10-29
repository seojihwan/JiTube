import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestGetOneVideo,
  requestLikeVideo,
  requestClearOneVideo,
} from '../actions';
import { IStoreState, IVideoData } from '../store';
import { Button } from './styles';

interface ILikeButtonProps {
  video_id: string;
  likePeople: Array<string>;
}
export const LikeButton: React.FC<ILikeButtonProps> = ({
  video_id,
  likePeople,
}) => {
  const newLikePeople = useSelector(
    (store: IStoreState) => store.currentPageVideo?.likePeople
  );
  const auth = useSelector((store: IStoreState) => store.authentication);
  const updatedLikePeople = useMemo(() => newLikePeople || likePeople || [], [
    newLikePeople,
  ]);
  const [like, setLike] = useState(
    useMemo(() => {
      if (auth) {
        return updatedLikePeople.includes(auth.user_id);
      }
      return false;
    }, [updatedLikePeople])
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestGetOneVideo(video_id));
    if (auth) {
      setLike(updatedLikePeople.includes(auth.user_id));
    }
    return () => {
      dispatch(requestClearOneVideo());
    };
  }, []);

  const onClick = useCallback(() => {
    if (auth) {
      dispatch(
        requestLikeVideo({
          user_id: auth.user_id,
          video_id,
          like: !like,
        })
      );
      setLike(!like);
    } else {
      alert('로그인 해주세요');
    }
  }, [auth, like]);

  return <Button like={like} onClick={onClick} />;
};
