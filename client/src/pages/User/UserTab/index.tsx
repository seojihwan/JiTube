import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStoreState } from '../../../store';
import { Thumbnail } from '../../../components';
import {
  Container,
  TabContainer,
  UserTitle,
  UserThumbnailWrapper,
} from './styles';

interface UserTabProps {
  activeItem: number;
  isAdmin: boolean;
}

export const UserTab: React.FC<UserTabProps> = ({ activeItem, isAdmin }) => {
  const UserActivetab = () => {
    switch (activeItem) {
      case 0:
        return <UserHome isAdmin={isAdmin} />;
      case 1:
        return <UserVideos isAdmin={isAdmin} />;
      default:
        return <UserHome isAdmin={isAdmin} />;
    }
  };

  return (
    <TabContainer>
      <UserActivetab />
    </TabContainer>
  );
};

interface TabItemProps {
  isAdmin: boolean;
}

const UserHome: React.FC<TabItemProps> = ({ isAdmin }) => {
  const userAllVideos = useSelector(
    (store: IStoreState) => store.currentPageUserVideos
  );
  const UserPopularTopTenVideos = useSelector(
    (store: IStoreState) => store.currentPageUserPopularTopTenVideos
  );
  return (
    <Container>
      <UserTitle>
        업로드한 동영상{userAllVideos ? '' : '이 없습니다.'}
      </UserTitle>
      <UserThumbnailWrapper>
        {userAllVideos?.map((video, idx) => (
          <Thumbnail key={idx} {...video} isChannel={true} isAdmin={isAdmin} />
        ))}
      </UserThumbnailWrapper>
      {userAllVideos && <UserTitle>인기 동영상</UserTitle>}
      <UserThumbnailWrapper>
        {UserPopularTopTenVideos?.map((video, idx) => (
          <Thumbnail key={idx} {...video} isChannel={true} isAdmin={isAdmin} />
        ))}
      </UserThumbnailWrapper>
      {isAdmin && !userAllVideos?.length && <UserUploadVideo />}
    </Container>
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

const UserVideos: React.FC<TabItemProps> = ({ isAdmin }) => {
  const userAllVideos = useSelector(
    (store: IStoreState) => store.currentPageUserVideos
  );
  console.log(userAllVideos);

  return (
    <Container>
      <UserTitle>
        업로드한 동영상{userAllVideos ? '' : '이 없습니다.'}
      </UserTitle>
      <UserThumbnailWrapper>
        {userAllVideos?.map((video, idx) => (
          <Thumbnail key={idx} {...video} isChannel={true} isAdmin={isAdmin} />
        ))}
      </UserThumbnailWrapper>
      {isAdmin && !userAllVideos && <UserEmptyVideo />}
    </Container>
  );
};

const UserEmptyVideo = () => {
  return <h2>등록된 동영상이 없습니다.</h2>;
};
