import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStoreState } from '../store';
import { Thumbnail } from '../component';
import {
  UserWrapper,
  UserTitle,
  UserThumbnailWrapper,
  MoreButton,
} from './styles';

interface UserHomeProps {
  isAdmin: boolean;
}
export const UserHome: React.FC<UserHomeProps> = ({ isAdmin }) => {
  const userAllVideos = useSelector(
    (store: IStoreState) => store.currentPageUserVideos
  );
  console.log(userAllVideos);
  return (
    <UserWrapper>
      <UserTitle>업로드한 동영상</UserTitle>
      <UserThumbnailWrapper>
        {userAllVideos?.map((video, idx) => (
          <Thumbnail key={idx} {...video} isChannel={true} isAdmin={isAdmin} />
        ))}
      </UserThumbnailWrapper>
      <UserTitle>인기 동영상</UserTitle>
      <UserThumbnailWrapper>
        {userAllVideos?.map((video, idx) => (
          <Thumbnail key={idx} {...video} isChannel={true} isAdmin={isAdmin} />
        ))}
      </UserThumbnailWrapper>
      {isAdmin && !userAllVideos && <UserUploadVideo />}
    </UserWrapper>
  );
};

const UserUploadVideo = () => {
  return (
    <>
      <h2>동영상을 업로드하여 시작하기</h2>
      <h4>
        스토리를 공유하고 시청자와 소통해 보세요. 업로드한 동영상이 여기에
        표시됩니다.
      </h4>
      <Link to="/video/upload">
        <button>동영상 업로드</button>
      </Link>
    </>
  );
};
