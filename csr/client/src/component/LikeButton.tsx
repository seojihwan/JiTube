import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetOneVideo, requestLikeVideo } from '../actions';
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
  const updatedLikePeople = newLikePeople || likePeople || [];
  const [like, setLike] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestGetOneVideo(video_id));
    setLike(!updatedLikePeople.includes(auth?.user_id || 'fffffffff'));
  }, [newLikePeople]);

  const onClick = () => {
    if (auth) {
      dispatch(
        requestLikeVideo({
          user_id: auth.user_id,
          video_id,
          like,
        })
      );
    } else {
      alert('로그인 해주세요');
    }
  };
  return <Button like={like} onClick={onClick} />;
};
