import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLikeVideo } from '../actions';
import { IStoreState, IVideoData } from '../store';

interface ILikeButtonProps {
  videoData: IVideoData;
}
export const LikeButton: React.FC<ILikeButtonProps> = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [like, setLike] = useState(false);
  const videoData: IVideoData = props.videoData;

  const dispatch = useDispatch();
  const auth = useSelector((store: IStoreState) => store.authentication);

  useEffect(() => {
    if (!auth) {
      setDisabled(true);
      setLike(true);
    } else {
      setDisabled(false);
      setLike(!videoData.likePeople.includes(auth.user_id || ''));
    }
  }, []);

  const onClick = () => {
    if (auth) {
      dispatch(
        requestLikeVideo({
          user_id: auth.user_id,
          video_id: videoData._id,
          like,
        })
      );
    } else {
      alert('로그인 인증 에러');
    }
    setLike(!like);
  };
  return (
    <button disabled={disabled} onClick={onClick}>
      {like ? '좋아요' : '좋아요취소'}
    </button>
  );
};
