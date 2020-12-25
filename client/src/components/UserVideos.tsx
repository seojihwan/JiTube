import React from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../store';
import { Thumbnail } from '../components';
import { UserWrapper, UserTitle, UserThumbnailWrapper } from './styles';

interface UserVideoProps {
  isAdmin: boolean;
}
export const UserVideos: React.FC<UserVideoProps> = ({ isAdmin }) => {
  const userAllVideos = useSelector(
    (store: IStoreState) => store.currentPageUserVideos
  );
  console.log(userAllVideos);

  return (
    <UserWrapper>
      <UserTitle>
        업로드한 동영상{userAllVideos ? '' : '이 없습니다.'}
      </UserTitle>
      <UserThumbnailWrapper>
        {userAllVideos?.map((video, idx) => (
          <Thumbnail key={idx} {...video} isChannel={true} isAdmin={isAdmin} />
        ))}
      </UserThumbnailWrapper>
      {isAdmin && !userAllVideos && <UserEmptyVideo />}
    </UserWrapper>
  );
};

const UserEmptyVideo = () => {
  return <h2>등록된 동영상이 없습니다.</h2>;
};
